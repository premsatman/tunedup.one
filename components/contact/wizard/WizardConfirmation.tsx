import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { wizardStepTitleClass } from './wizardStepTitle'
import WizardBranchLabel from './WizardBranchLabel'

type WizardConfirmationProps = {
  branch: 'project' | 'join'
  onReset: () => void
}

const branchLabels = {
  project: 'Start a Project',
  join: 'Join Us',
} as const

const content = {
  project: {
    headline: 'Message received.',
    body: "We'll reply within one business day — usually faster. In the meantime, take a look at",
    linkLabel: 'some of our work',
    linkHref: '/work',
  },
  join: {
    headline: 'Thanks for reaching out.',
    body: "We're not actively hiring right now, but we read every note. If there's a fit, you'll hear back.",
    linkLabel: null,
    linkHref: null,
  },
}

export default function WizardConfirmation({ branch, onReset }: WizardConfirmationProps) {
  const c = content[branch]

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      <WizardBranchLabel>{branchLabels[branch]}</WizardBranchLabel>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]">
        <CheckCircle2 size={32} className="text-[var(--accent)]" />
      </div>

      <h3 className={`${wizardStepTitleClass} text-center`}>
        {c.headline}
      </h3>

      <p className="max-w-md font-body leading-relaxed text-[var(--ink-mid)]">
        {c.body}{' '}
        {c.linkHref && c.linkLabel && (
          <Link
            href={c.linkHref}
            className="underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
          >
            {c.linkLabel}
          </Link>
        )}
        {c.linkHref && '.'}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        Start over
      </button>
    </div>
  )
}
