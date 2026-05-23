'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import WizardPill from './WizardPill'
import WizardInput from './WizardInput'
import WizardTextarea from './WizardTextarea'
import WizardNavigation from './WizardNavigation'
import { wizardStepTitleClass } from './wizardStepTitle'
import WizardBranchLabel from './WizardBranchLabel'
import {
  centeredFormWrapClass,
  centeredStepBodyClass,
  wizardPillsClass,
} from './wizardStepLayout'

export type JoinData = {
  role: string
  name: string
  email: string
  location: string
  portfolio: string
  pitch: string
}

export const emptyJoinData: JoinData = {
  role: '',
  name: '',
  email: '',
  location: '',
  portfolio: '',
  pitch: '',
}

const ROLE_OPTIONS = [
  'Designer',
  'Developer',
  'Content / Copywriter',
  'Marketing & Ads',
  'Other / Multi-skilled',
]

type JoinBranchProps = {
  step: number
  data: JoinData
  onChange: (patch: Partial<JoinData>) => void
  onBack: () => void
  onContinue: () => void
  onSubmit: () => void
  loading: boolean
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

export default function JoinBranch({
  step,
  data,
  onChange,
  onBack,
  onContinue,
  onSubmit,
  loading,
}: JoinBranchProps) {
  const shouldReduceMotion = useReducedMotion()
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headlineRef.current?.focus()
  }, [step])

  const stepMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.2 },
      }

  const canContinueStep0 = data.role !== ''
  const canSubmit =
    data.name.trim() !== '' &&
    isValidEmail(data.email) &&
    data.pitch.trim().length >= 20

  const handleContinue = () => {
    if (step === 1) {
      onSubmit()
      return
    }
    onContinue()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key={0} {...stepMotion} className="flex flex-1 flex-col">
            <div className={centeredStepBodyClass}>
              <WizardBranchLabel>Join Us</WizardBranchLabel>
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                What kind of work do you do best?
              </h3>
              <div
                role="radiogroup"
                aria-label="What kind of work do you do best?"
                className={wizardPillsClass}
              >
                {ROLE_OPTIONS.map((label) => (
                  <WizardPill
                    key={label}
                    label={label}
                    mode="radio"
                    selected={data.role === label}
                    onClick={() => onChange({ role: label })}
                    className="w-full"
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
              <WizardBranchLabel>Join Us</WizardBranchLabel>
              <h3
                ref={headlineRef}
                tabIndex={-1}
                className={`${wizardStepTitleClass} text-center`}
              >
                Tell us about yourself.
              </h3>
              <div className={centeredFormWrapClass}>
                <div className="grid grid-cols-2 gap-5">
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
                    label="City / Country"
                    value={data.location}
                    onChange={(location) => onChange({ location })}
                    optional
                    autoComplete="address-level2"
                  />
                  <WizardInput
                    label="Portfolio or LinkedIn"
                    type="url"
                    placeholder="https://"
                    value={data.portfolio}
                    onChange={(portfolio) => onChange({ portfolio })}
                    optional
                  />
                  <div className="col-span-2">
                    <WizardTextarea
                      label="What kind of work lights you up?"
                      placeholder="Tell us what you're best at, what you've built, and why you'd want to work with a team like ours."
                      value={data.pitch}
                      onChange={(pitch) => onChange({ pitch })}
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
              continueLabel="Send Application"
              continueDisabled={!canSubmit}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
