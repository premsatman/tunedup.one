'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import PageGutter from '@/components/shared/PageGutter'
import Pill from '@/components/shared/Pill'
import CalendlyPopup from '@/components/contact/CalendlyPopup'
import { getCalendlyUrl } from '@/lib/getCalendlyUrl'
import { scrollToContactWizard } from '@/lib/scrollToContactWizard'
import { wizardStepTitleClass } from '@/components/contact/wizard/wizardStepTitle'
import ProjectBranch, {
  emptyProjectData,
  type ProjectData,
} from '@/components/contact/wizard/ProjectBranch'
import JoinBranch, { emptyJoinData, type JoinData } from '@/components/contact/wizard/JoinBranch'
import WizardConfirmation from '@/components/contact/wizard/WizardConfirmation'

type Branch = 'project' | 'join' | null
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const bookACallPillClass =
  'group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--canvas)] px-7 py-3.5 font-mono text-sm normal-case tracking-normal text-[var(--ink)] transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'

const BookACallTab = ({
  prefill,
}: {
  prefill?: { name?: string; email?: string }
}) => (
  <CalendlyPopup url={getCalendlyUrl()} prefill={prefill} className={bookACallPillClass}>
    Book a Call
  </CalendlyPopup>
)

const BranchTab = ({
  label,
  selected,
  onClick,
  disabled,
  soonTag,
}: {
  label: string
  selected: boolean
  onClick?: () => void
  disabled?: boolean
  soonTag?: boolean
}) => (
  <div className="inline-flex items-center gap-2">
    <Pill
      theme="contact"
      variant={selected ? 'primary' : 'outline'}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? 'Coming soon' : undefined}
      className="normal-case tracking-normal"
    >
      {label}
    </Pill>
    {soonTag && (
      <span className="rounded-full bg-[var(--ink-soft)] px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--canvas)]">
        Soon
      </span>
    )}
  </div>
)

export default function ContactWizard() {
  const wizardPanelRef = useRef<HTMLDivElement>(null)
  const [branch, setBranch] = useState<Branch>(null)
  const [projectStep, setProjectStep] = useState(0)
  const [joinStep, setJoinStep] = useState(0)
  const [projectData, setProjectData] = useState<ProjectData>(emptyProjectData)
  const [joinData, setJoinData] = useState<JoinData>(emptyJoinData)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleSelectBranch = (next: 'project' | 'join') => {
    if (branch === next) {
      if (next === 'project') {
        setProjectStep(0)
        setProjectData(emptyProjectData)
      } else {
        setJoinStep(0)
        setJoinData(emptyJoinData)
      }
      setSubmitStatus('idle')
      return
    }

    setBranch(next)
    setSubmitStatus('idle')
    if (next === 'project') {
      setProjectStep(0)
    } else {
      setJoinStep(0)
    }
  }

  const handleReset = () => {
    setBranch(null)
    setProjectStep(0)
    setJoinStep(0)
    setProjectData(emptyProjectData)
    setJoinData(emptyJoinData)
    setSubmitStatus('idle')
  }

  const handleSubmit = async (submitBranch: 'project' | 'join') => {
    setSubmitStatus('loading')
    try {
      const payload = {
        branch: submitBranch,
        data: submitBranch === 'project' ? projectData : joinData,
        submittedAt: new Date().toISOString(),
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Server error')
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  const handleProjectBack = () => {
    if (projectStep === 0) {
      setBranch(null)
      return
    }
    setProjectStep((s) => s - 1)
  }

  const handleJoinBack = () => {
    if (joinStep === 0) {
      setBranch(null)
      return
    }
    setJoinStep((s) => s - 1)
  }

  const calendlyPrefill = {
    name: projectData.name || undefined,
    email: projectData.email || undefined,
  }

  const needsInnerScroll =
    (branch === 'project' && projectStep === 3) || (branch === 'join' && joinStep === 1)

  useEffect(() => {
    if (branch === null && submitStatus !== 'success') return
    scrollToContactWizard(wizardPanelRef.current)
  }, [branch, submitStatus])

  const branchSelector = (
    <div className="flex flex-wrap justify-center gap-3">
      <BranchTab
        label="Start a Project"
        selected={branch === 'project'}
        onClick={() => handleSelectBranch('project')}
      />
      <BranchTab
        label="Join Us"
        selected={branch === 'join'}
        onClick={() => handleSelectBranch('join')}
      />
      <BookACallTab prefill={calendlyPrefill} />
    </div>
  )

  return (
    <section id="contact-wizard" className="py-20 lg:py-28">
      <PageGutter>
        <MonoLabel className="mb-4 block">/ Get in Touch</MonoLabel>
        <h2 className={`${wizardStepTitleClass} mb-16`}>
          Have a project, a question,{' '}
          <HighlightWord>or just want to say hello?</HighlightWord>
        </h2>

        <div
          ref={wizardPanelRef}
          className="mx-auto flex w-full max-w-5xl min-h-[720px] flex-col rounded-3xl bg-[var(--contact-form-bg)] p-6 lg:min-h-[760px] lg:p-12"
        >
          <div
            className={clsx(
              'flex min-h-0 flex-1 flex-col overflow-x-hidden overscroll-contain',
              needsInnerScroll ? 'overflow-y-auto scrollbar-hide' : 'overflow-hidden'
            )}
          >
            {submitStatus === 'success' && branch && (
              <WizardConfirmation branch={branch} onReset={handleReset} />
            )}

            {submitStatus !== 'success' && branch === null && (
              <div className="flex flex-1 flex-col items-center justify-center gap-10 py-8">
                <h3 className={`${wizardStepTitleClass} max-w-3xl text-center`}>
                  Hey there. What brings you to the workshop today?
                </h3>
                {branchSelector}
              </div>
            )}

            {submitStatus !== 'success' && branch === 'project' && (
              <>
                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
                  >
                    Something went wrong. Please try again or email us directly at prem@tunedup.one
                  </div>
                )}
                <ProjectBranch
                  step={projectStep}
                  data={projectData}
                  onChange={(patch) => setProjectData((prev) => ({ ...prev, ...patch }))}
                  onBack={handleProjectBack}
                  onContinue={() => setProjectStep((s) => s + 1)}
                  onSubmit={() => handleSubmit('project')}
                  loading={submitStatus === 'loading'}
                />
              </>
            )}

            {submitStatus !== 'success' && branch === 'join' && (
              <>
                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
                  >
                    Something went wrong. Please try again or email us directly at prem@tunedup.one
                  </div>
                )}
                <JoinBranch
                  step={joinStep}
                  data={joinData}
                  onChange={(patch) => setJoinData((prev) => ({ ...prev, ...patch }))}
                  onBack={handleJoinBack}
                  onContinue={() => setJoinStep((s) => s + 1)}
                  onSubmit={() => handleSubmit('join')}
                  loading={submitStatus === 'loading'}
                />
              </>
            )}
          </div>
        </div>
      </PageGutter>
    </section>
  )
}
