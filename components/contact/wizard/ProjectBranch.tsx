'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import WizardPill from './WizardPill'
import WizardInput from './WizardInput'
import WizardTextarea from './WizardTextarea'
import WizardNavigation from './WizardNavigation'
import { wizardStepTitleClass } from './wizardStepTitle'
import {
  centeredFormWrapClass,
  centeredPillsClass,
  centeredStepBodyClass,
} from './wizardStepLayout'

export type BudgetCurrency = 'USD' | 'INR'

export type ProjectData = {
  services: string[]
  audience: string
  budgetCurrency: BudgetCurrency
  budget: string
  name: string
  email: string
  company: string
  phone: string
  description: string
}

export const emptyProjectData: ProjectData = {
  services: [],
  audience: '',
  budgetCurrency: 'USD',
  budget: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  description: '',
}

const NOT_SURE_SERVICE = 'Not sure yet'

const SERVICE_OPTIONS = [
  { label: 'Brand & Identity' },
  { label: 'Website / Web App' },
  { label: 'Mobile App' },
  { label: 'Google Ads & SEO' },
  { label: 'Non-profit Ads Grant' },
  { label: 'Workflow Automation' },
  { label: NOT_SURE_SERVICE },
]

const AUDIENCE_OPTIONS = [
  'A Church or Ministry',
  'An NGO or Nonprofit',
  'An Entrepreneur / Solo Founder',
  'A Startup or Scale-Up',
  'Something else',
]

type BudgetOption = { label: string; subtext?: string }

const BUDGET_OPTIONS_USD: BudgetOption[] = [
  { label: 'Under $1K' },
  { label: '$1K – $3K' },
  { label: '$3K – $7K' },
  { label: '$7K – $15K' },
  { label: '$15K+' },
  { label: 'Not sure yet' },
]

const BUDGET_OPTIONS_INR: BudgetOption[] = [
  { label: 'Under ₹25,000' },
  { label: '₹25,000 – ₹75,000' },
  { label: '₹75,000 – ₹1,50,000' },
  { label: '₹1,50,000+' },
  { label: 'Not sure yet' },
]

const CurrencyToggle = ({
  currency,
  onChange,
}: {
  currency: BudgetCurrency
  onChange: (currency: BudgetCurrency) => void
}) => (
  <div
    className="absolute right-0 top-0 flex items-center gap-3"
    role="group"
    aria-label="Budget currency"
  >
    {(['USD', 'INR'] as const).map((code) => (
      <button
        key={code}
        type="button"
        onClick={() => onChange(code)}
        aria-pressed={currency === code}
        className={clsx(
          'font-mono text-sm font-medium uppercase tracking-widest transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
          currency === code
            ? 'text-[var(--ink)]'
            : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
        )}
      >
        {code}
      </button>
    ))}
  </div>
)

type ProjectBranchProps = {
  step: number
  data: ProjectData
  onChange: (patch: Partial<ProjectData>) => void
  onBack: () => void
  onContinue: () => void
  onSubmit: () => void
  loading: boolean
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

export default function ProjectBranch({
  step,
  data,
  onChange,
  onBack,
  onContinue,
  onSubmit,
  loading,
}: ProjectBranchProps) {
  const shouldReduceMotion = useReducedMotion()
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headlineRef.current?.focus()
  }, [step])

  const handleServiceToggle = (label: string) => {
    if (label === NOT_SURE_SERVICE) {
      onChange({ services: [NOT_SURE_SERVICE] })
      return
    }

    const withoutNotSure = data.services.filter((s) => s !== NOT_SURE_SERVICE)
    const next = withoutNotSure.includes(label)
      ? withoutNotSure.filter((s) => s !== label)
      : [...withoutNotSure, label]
    onChange({ services: next })
  }

  const stepMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.2 },
      }

  const canContinueStep0 = data.services.length > 0
  const canContinueStep1 = data.audience !== ''
  const canContinueStep2 = data.budget !== ''
  const canSubmit =
    data.name.trim() !== '' &&
    isValidEmail(data.email) &&
    data.description.trim().length >= 20

  const handleContinue = () => {
    if (step === 3) {
      onSubmit()
      return
    }
    onContinue()
  }

  const handleCurrencyChange = (next: BudgetCurrency) => {
    if (next === data.budgetCurrency) return
    onChange({ budgetCurrency: next, budget: '' })
  }

  const budgetOptions =
    data.budgetCurrency === 'INR' ? BUDGET_OPTIONS_INR : BUDGET_OPTIONS_USD

  return (
    <div className="flex flex-1 flex-col">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key={0} {...stepMotion} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                Let&apos;s figure out what you&apos;re building.
              </h3>
              <div
                role="group"
                aria-label="What do you need?"
                className="mt-10 flex max-w-4xl flex-wrap justify-center gap-3"
              >
                {SERVICE_OPTIONS.map(({ label }) => (
                  <WizardPill
                    key={label}
                    label={label}
                    mode="checkbox"
                    selected={data.services.includes(label)}
                    onClick={() => handleServiceToggle(label)}
                  />
                ))}
              </div>
            </div>
            <WizardNavigation
              className="mt-auto"
              onBack={onBack}
              onContinue={handleContinue}
              continueDisabled={!canContinueStep0}
              loading={loading}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key={1} {...stepMotion} className="flex flex-1 flex-col">
            <div className={centeredStepBodyClass}>
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                So we know the right questions to ask.
              </h3>
              <div
                role="radiogroup"
                aria-label="Who are you?"
                className={centeredPillsClass}
              >
                {AUDIENCE_OPTIONS.map((label) => (
                  <WizardPill
                    key={label}
                    label={label}
                    mode="radio"
                    selected={data.audience === label}
                    onClick={() => onChange({ audience: label })}
                  />
                ))}
              </div>
            </div>
            <WizardNavigation
              className="mt-auto"
              onBack={onBack}
              onContinue={handleContinue}
              continueDisabled={!canContinueStep1}
              loading={loading}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key={2} {...stepMotion} className="flex flex-1 flex-col">
            <div className={centeredStepBodyClass}>
              <CurrencyToggle
                currency={data.budgetCurrency}
                onChange={handleCurrencyChange}
              />
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                Honest answers save us both time.
              </h3>
              <div
                role="radiogroup"
                aria-label={`What's your budget for this project in ${data.budgetCurrency}?`}
                className={centeredPillsClass}
              >
                {budgetOptions.map(({ label }) => (
                  <WizardPill
                    key={label}
                    label={label}
                    mode="radio"
                    selected={data.budget === label}
                    onClick={() => onChange({ budget: label })}
                  />
                ))}
              </div>
            </div>
            <WizardNavigation
              className="mt-auto"
              onBack={onBack}
              onContinue={handleContinue}
              continueDisabled={!canContinueStep2}
              loading={loading}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key={3} {...stepMotion} className="flex flex-1 flex-col">
            <div className={centeredStepBodyClass}>
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                Last step. Tell us the rest.
              </h3>
              <div className={centeredFormWrapClass}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <WizardInput
                    label="Full Name"
                    value={data.name}
                    onChange={(name) => onChange({ name })}
                    required
                    autoComplete="name"
                  />
                  <WizardInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(email) => onChange({ email })}
                    required
                    autoComplete="email"
                  />
                  <WizardInput
                    label="Company / Organisation"
                    value={data.company}
                    onChange={(company) => onChange({ company })}
                    optional
                    autoComplete="organization"
                  />
                  <WizardInput
                    label="Phone"
                    type="tel"
                    value={data.phone}
                    onChange={(phone) => onChange({ phone })}
                    optional
                    autoComplete="tel"
                  />
                  <div className="md:col-span-2">
                    <WizardTextarea
                      label="Tell us about the project"
                      hint="What are you building, who's it for, and what does success look like in 6 months?"
                      placeholder="We run weekly services for 2,000 people and need a website that actually helps newcomers find us..."
                      value={data.description}
                      onChange={(description) => onChange({ description })}
                      required
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
            <WizardNavigation
              className="mt-auto"
              onBack={onBack}
              onContinue={handleContinue}
              continueLabel="Send Message"
              continueDisabled={!canSubmit}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
