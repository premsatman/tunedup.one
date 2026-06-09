import { Resend } from 'resend'

export type ProjectSubmission = {
  services: string[]
  audience: string
  budgetCurrency: 'USD' | 'INR'
  budget: string
  name: string
  email: string
  company: string
  phone: string
  description: string
}

export type JoinSubmission = {
  role: string
  name: string
  email: string
  location: string
  portfolio: string
  pitch: string
}

export type ContactSubmissionPayload = {
  branch: 'project' | 'join'
  data: ProjectSubmission | JoinSubmission
  submittedAt: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL?.trim() || 'prem@tunedup.one'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL?.trim() || 'TunedUp <hello@tunedup.one>'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const isValidEmail = (email: string) => EMAIL_REGEX.test(email.trim())

const isProjectSubmission = (data: unknown): data is ProjectSubmission => {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  return (
    Array.isArray(record.services) &&
    typeof record.audience === 'string' &&
    typeof record.budgetCurrency === 'string' &&
    typeof record.budget === 'string' &&
    typeof record.name === 'string' &&
    typeof record.email === 'string' &&
    typeof record.company === 'string' &&
    typeof record.phone === 'string' &&
    typeof record.description === 'string'
  )
}

const isJoinSubmission = (data: unknown): data is JoinSubmission => {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  return (
    typeof record.role === 'string' &&
    typeof record.name === 'string' &&
    typeof record.email === 'string' &&
    typeof record.location === 'string' &&
    typeof record.portfolio === 'string' &&
    typeof record.pitch === 'string'
  )
}

export const validateContactSubmission = (
  body: unknown,
): { ok: true; payload: ContactSubmissionPayload } | { ok: false; error: string } => {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' }
  }

  const record = body as Record<string, unknown>
  const branch = record.branch
  const data = record.data
  const submittedAt =
    typeof record.submittedAt === 'string' ? record.submittedAt : new Date().toISOString()

  if (branch !== 'project' && branch !== 'join') {
    return { ok: false, error: 'Invalid branch' }
  }

  if (branch === 'project') {
    if (!isProjectSubmission(data)) {
      return { ok: false, error: 'Invalid project submission' }
    }

    if (!data.name.trim() || !isValidEmail(data.email) || data.description.trim().length < 20) {
      return { ok: false, error: 'Missing required project fields' }
    }

    return {
      ok: true,
      payload: { branch, data, submittedAt },
    }
  }

  if (!isJoinSubmission(data)) {
    return { ok: false, error: 'Invalid join submission' }
  }

  if (!data.name.trim() || !isValidEmail(data.email) || data.pitch.trim().length < 20) {
    return { ok: false, error: 'Missing required join fields' }
  }

  return {
    ok: true,
    payload: { branch, data, submittedAt },
  }
}

const row = (label: string, value: string) => {
  if (!value.trim()) return ''
  return `
    <tr>
      <td style="padding:8px 12px 8px 0;font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#B8B5AE;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#2A2A2A;">${escapeHtml(value)}</td>
    </tr>
  `
}

const buildRows = (entries: Array<[string, string]>) =>
  entries.map(([label, value]) => row(label, value)).join('')

const emailShell = (title: string, intro: string, rowsHtml: string) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#EEF1F0;font-family:system-ui,sans-serif;color:#0A0A0A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(10,10,10,0.08);border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:#0b0b0d;color:#F5F1E8;font-family:system-ui,sans-serif;font-size:20px;font-weight:700;">
          ${escapeHtml(title)}
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#2A2A2A;">${escapeHtml(intro)}</p>
          <table width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

const buildProjectNotification = (data: ProjectSubmission, submittedAt: string) => {
  const subject = `New project inquiry — ${data.name.trim()}`
  const html = emailShell(
    'New project inquiry',
    'A new Start a Project submission arrived from the contact wizard.',
    buildRows([
      ['Submitted', new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
      ['Name', data.name.trim()],
      ['Email', data.email.trim()],
      ['Company', data.company.trim()],
      ['Phone', data.phone.trim()],
      ['Services', data.services.join(', ')],
      ['Audience', data.audience.trim()],
      ['Budget', `${data.budget.trim()} (${data.budgetCurrency})`],
      ['Description', data.description.trim()],
    ]),
  )

  return { subject, html }
}

const buildJoinNotification = (data: JoinSubmission, submittedAt: string) => {
  const subject = `New join inquiry — ${data.name.trim()}`
  const html = emailShell(
    'New join inquiry',
    'A new Join Us submission arrived from the contact wizard.',
    buildRows([
      ['Submitted', new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
      ['Name', data.name.trim()],
      ['Email', data.email.trim()],
      ['Role', data.role.trim()],
      ['Location', data.location.trim()],
      ['Portfolio', data.portfolio.trim()],
      ['Pitch', data.pitch.trim()],
    ]),
  )

  return { subject, html }
}

const buildConfirmationEmail = (
  branch: 'project' | 'join',
  name: string,
) => {
  const firstName = name.trim().split(/\s+/)[0] || 'there'
  const isProject = branch === 'project'

  const subject = isProject
    ? 'We received your project inquiry — TunedUp'
    : 'Thanks for reaching out — TunedUp'

  const body = isProject
    ? `Hi ${firstName}, thanks for starting a project conversation with TunedUp. We received your message and will reply within one business day — usually faster.`
    : `Hi ${firstName}, thanks for introducing yourself to TunedUp. We're not actively hiring right now, but we read every note. If there's a fit, you'll hear back.`

  const html = emailShell(
    isProject ? 'Message received' : 'Thanks for reaching out',
    body,
    buildRows([
      ['Next step', isProject ? 'Our crew will review your brief and reply by email.' : 'We keep strong introductions on file for future missions.'],
      ['Website', 'https://tunedup.one/work'],
    ]),
  )

  return { subject, html }
}

export const sendContactEmails = async (payload: ContactSubmissionPayload) => {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const resend = new Resend(apiKey)
  const submitterEmail =
    payload.branch === 'project'
      ? payload.data.email.trim()
      : (payload.data as JoinSubmission).email.trim()
  const submitterName =
    payload.branch === 'project'
      ? payload.data.name.trim()
      : (payload.data as JoinSubmission).name.trim()

  const notification =
    payload.branch === 'project'
      ? buildProjectNotification(payload.data as ProjectSubmission, payload.submittedAt)
      : buildJoinNotification(payload.data as JoinSubmission, payload.submittedAt)

  const confirmation = buildConfirmationEmail(payload.branch, submitterName)

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      replyTo: submitterEmail,
      subject: notification.subject,
      html: notification.html,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: [submitterEmail],
      subject: confirmation.subject,
      html: confirmation.html,
    }),
  ])

  if (notifyResult.error) {
    throw new Error(notifyResult.error.message)
  }

  if (confirmResult.error) {
    throw new Error(confirmResult.error.message)
  }

  return {
    notifyId: notifyResult.data?.id,
    confirmId: confirmResult.data?.id,
  }
}
