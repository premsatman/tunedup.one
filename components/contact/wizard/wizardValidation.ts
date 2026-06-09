export const MIN_MESSAGE_LENGTH = 20

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidWizardEmail = (email: string) => EMAIL_REGEX.test(email.trim())

type ProjectFields = {
  name: string
  email: string
  description: string
}

type JoinFields = {
  name: string
  email: string
  pitch: string
}

export const getProjectSubmitHint = ({ name, email, description }: ProjectFields) => {
  if (!name.trim()) return 'Enter your full name to send.'
  if (!isValidWizardEmail(email)) return 'Enter a valid email address to send.'
  const length = description.trim().length
  if (length < MIN_MESSAGE_LENGTH) {
    return `Add a few more details about your project (${length}/${MIN_MESSAGE_LENGTH} characters).`
  }
  return null
}

export const canSubmitProject = (fields: ProjectFields) => getProjectSubmitHint(fields) === null

export const getJoinSubmitHint = ({ name, email, pitch }: JoinFields) => {
  if (!name.trim()) return 'Enter your full name to send.'
  if (!isValidWizardEmail(email)) return 'Enter a valid email address to send.'
  const length = pitch.trim().length
  if (length < MIN_MESSAGE_LENGTH) {
    return `Tell us a bit more about your work (${length}/${MIN_MESSAGE_LENGTH} characters).`
  }
  return null
}

export const canSubmitJoin = (fields: JoinFields) => getJoinSubmitHint(fields) === null
