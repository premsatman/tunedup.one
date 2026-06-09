import type {
  ContactSubmissionPayload,
  JoinSubmission,
  ProjectSubmission,
} from '@/lib/email/contactSubmission'

const HUBSPOT_API = 'https://api.hubapi.com'
const PIPELINE_CACHE_TTL_MS = 5 * 60 * 1000

type HubSpotConfig = {
  accessToken: string
  pipelineId: string
  stageId: string
}

type HubSpotStage = {
  id: string
  label: string
}

type HubSpotPipeline = {
  id: string
  label: string
  stages: HubSpotStage[]
}

type ResolvedPipelineStage = {
  pipelineId: string
  stageId: string
  pipelineLabel: string
  stageLabel: string
}

let pipelineCache: { expiresAt: number; pipelines: HubSpotPipeline[] } | null = null

const getHubSpotConfig = (): HubSpotConfig | null => {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN?.trim()
  if (!accessToken) return null

  const pipelineId = process.env.HUBSPOT_PIPELINE_ID?.trim()
  const stageId = process.env.HUBSPOT_STAGE_NEW_LEAD?.trim()

  if (!pipelineId || !stageId) {
    throw new Error('HubSpot is partially configured. Set HUBSPOT_PIPELINE_ID and HUBSPOT_STAGE_NEW_LEAD.')
  }

  return { accessToken, pipelineId, stageId }
}

const splitName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return {
    firstname: parts[0] || '',
    lastname: parts.slice(1).join(' '),
  }
}

const compactProperties = (properties: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value.trim() !== ''),
  )

const formatHubSpotError = (body: unknown, status: number) => {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>
    const message = typeof record.message === 'string' ? record.message : null
    const errors = Array.isArray(record.errors) ? record.errors : []

    if (message) {
      const details = errors
        .map((error) => {
          if (error && typeof error === 'object' && 'message' in error) {
            return String(error.message)
          }
          return null
        })
        .filter(Boolean)
        .join(' | ')

      return details ? `${message} (${details})` : message
    }
  }

  return `HubSpot request failed (${status})`
}

const hubspotRequest = async <T>(
  path: string,
  config: HubSpotConfig,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${HUBSPOT_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(formatHubSpotError(body, response.status))
  }

  if (
    body &&
    typeof body === 'object' &&
    'errors' in body &&
    Array.isArray(body.errors) &&
    body.errors.length > 0
  ) {
    throw new Error(formatHubSpotError(body, response.status))
  }

  return body as T
}

const fetchDealPipelines = async (config: HubSpotConfig) => {
  const now = Date.now()
  if (pipelineCache && pipelineCache.expiresAt > now) {
    return pipelineCache.pipelines
  }

  const result = await hubspotRequest<{ results?: HubSpotPipeline[] }>(
    '/crm/v3/pipelines/deals',
    config,
  )

  const pipelines = result.results ?? []
  pipelineCache = {
    expiresAt: now + PIPELINE_CACHE_TTL_MS,
    pipelines,
  }

  return pipelines
}

const normalizeLookup = (value: string) => value.trim().toLowerCase()

const resolvePipelineStage = async (
  config: HubSpotConfig,
): Promise<ResolvedPipelineStage> => {
  const pipelines = await fetchDealPipelines(config)
  const pipelineLookup = normalizeLookup(config.pipelineId)

  const pipeline = pipelines.find(
    (item) =>
      item.id === config.pipelineId ||
      normalizeLookup(item.label) === pipelineLookup,
  )

  if (!pipeline) {
    const available = pipelines.map((item) => `${item.label} (${item.id})`).join(', ')
    throw new Error(
      `HubSpot pipeline "${config.pipelineId}" was not found. Available pipelines: ${available}`,
    )
  }

  const stageLookup = normalizeLookup(config.stageId)
  const stage = pipeline.stages.find(
    (item) =>
      item.id === config.stageId || normalizeLookup(item.label) === stageLookup,
  )

  if (!stage) {
    const available = pipeline.stages
      .map((item) => `${item.label} (${item.id})`)
      .join(', ')
    throw new Error(
      `HubSpot stage "${config.stageId}" was not found in pipeline "${pipeline.label}". Available stages: ${available}`,
    )
  }

  return {
    pipelineId: pipeline.id,
    stageId: stage.id,
    pipelineLabel: pipeline.label,
    stageLabel: stage.label,
  }
}

const findContactIdByEmail = async (email: string, config: HubSpotConfig) => {
  const result = await hubspotRequest<{
    results?: Array<{ id: string }>
  }>('/crm/v3/objects/contacts/search', config, {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            },
          ],
        },
      ],
      properties: ['email'],
      limit: 1,
    }),
  })

  return result.results?.[0]?.id
}

const upsertContact = async (
  properties: Record<string, string>,
  config: HubSpotConfig,
) => {
  const email = properties.email
  if (!email) {
    throw new Error('HubSpot contact requires an email address')
  }

  const existingId = await findContactIdByEmail(email, config)

  if (existingId) {
    await hubspotRequest(`/crm/v3/objects/contacts/${existingId}`, config, {
      method: 'PATCH',
      body: JSON.stringify({ properties: compactProperties(properties) }),
    })
    return existingId
  }

  const created = await hubspotRequest<{ id: string }>('/crm/v3/objects/contacts', config, {
    method: 'POST',
    body: JSON.stringify({ properties: compactProperties(properties) }),
  })

  return created.id
}

const createDealWithContact = async (
  properties: Record<string, string>,
  contactId: string,
  config: HubSpotConfig,
) => {
  const created = await hubspotRequest<{ id: string }>('/crm/v3/objects/deals', config, {
    method: 'POST',
    body: JSON.stringify({
      properties,
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3,
            },
          ],
        },
      ],
    }),
  })

  return created.id
}

const buildProjectDealDescription = (data: ProjectSubmission, submittedAt: string) =>
  [
    'Source: TunedUp contact wizard — Start a Project',
    `Submitted: ${new Date(submittedAt).toISOString()}`,
    '',
    `Services: ${data.services.join(', ')}`,
    `Audience: ${data.audience.trim()}`,
    `Budget: ${data.budget.trim()} (${data.budgetCurrency})`,
    '',
    'Project brief:',
    data.description.trim(),
  ].join('\n')

const buildJoinDealDescription = (data: JoinSubmission, submittedAt: string) =>
  [
    'Source: TunedUp contact wizard — Join Us',
    `Submitted: ${new Date(submittedAt).toISOString()}`,
    '',
    `Role: ${data.role.trim()}`,
    `Location: ${data.location.trim() || 'Not provided'}`,
    `Portfolio: ${data.portfolio.trim() || 'Not provided'}`,
    '',
    'Introduction:',
    data.pitch.trim(),
  ].join('\n')

const syncSubmission = async (
  payload: ContactSubmissionPayload,
  config: HubSpotConfig,
  dealName: string,
  description: string,
  contactProperties: Record<string, string>,
) => {
  const pipelineStage = await resolvePipelineStage(config)
  const contactId = await upsertContact(contactProperties, config)
  const dealId = await createDealWithContact(
    {
      dealname: dealName,
      pipeline: pipelineStage.pipelineId,
      dealstage: pipelineStage.stageId,
      description,
    },
    contactId,
    config,
  )

  return {
    contactId,
    dealId,
    pipeline: pipelineStage.pipelineLabel,
    stage: pipelineStage.stageLabel,
  }
}

const syncProjectSubmission = async (
  payload: ContactSubmissionPayload,
  data: ProjectSubmission,
  config: HubSpotConfig,
) => {
  const { firstname, lastname } = splitName(data.name)
  const email = data.email.trim().toLowerCase()

  return syncSubmission(
    payload,
    config,
    `Project inquiry — ${data.name.trim()}`,
    buildProjectDealDescription(data, payload.submittedAt),
    {
      email,
      firstname,
      lastname,
      phone: data.phone.trim(),
      company: data.company.trim(),
    },
  )
}

const syncJoinSubmission = async (
  payload: ContactSubmissionPayload,
  data: JoinSubmission,
  config: HubSpotConfig,
) => {
  const { firstname, lastname } = splitName(data.name)
  const email = data.email.trim().toLowerCase()

  const contactProperties: Record<string, string> = {
    email,
    firstname,
    lastname,
  }

  if (data.portfolio.trim()) {
    contactProperties.website = data.portfolio.trim()
  }

  return syncSubmission(
    payload,
    config,
    `Join inquiry — ${data.name.trim()} (${data.role.trim()})`,
    buildJoinDealDescription(data, payload.submittedAt),
    contactProperties,
  )
}

export const syncContactSubmissionToHubSpot = async (payload: ContactSubmissionPayload) => {
  const config = getHubSpotConfig()
  if (!config) return null

  if (payload.branch === 'project') {
    return syncProjectSubmission(payload, payload.data as ProjectSubmission, config)
  }

  return syncJoinSubmission(payload, payload.data as JoinSubmission, config)
}
