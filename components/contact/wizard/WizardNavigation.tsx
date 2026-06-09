'use client'

import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import Pill from '@/components/shared/Pill'

type WizardNavigationProps = {
  onBack?: () => void
  onContinue?: () => void
  continueLabel?: string
  continueDisabled?: boolean
  continueHint?: string | null
  loading?: boolean
  showBack?: boolean
  className?: string
}

export default function WizardNavigation({
  onBack,
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  continueHint = null,
  loading = false,
  showBack = true,
  className = '',
}: WizardNavigationProps) {
  return (
    <div className={clsx('w-full shrink-0', className || 'mt-6')}>
      {continueDisabled && continueHint && !loading ? (
        <p
          role="status"
          aria-live="polite"
          className="mb-3 text-center font-body text-sm text-[var(--ink-soft)]"
        >
          {continueHint}
        </p>
      ) : null}
      <div className="flex w-full items-center justify-between pt-2">
      <div className="overflow-visible">
        {showBack && onBack && (
          <Pill
            theme="contact"
            variant="outline"
            onClick={onBack}
            className="normal-case tracking-normal gap-2"
          >
            <ArrowLeft size={14} aria-hidden />
            Go Back
          </Pill>
        )}
      </div>

      <div className="overflow-visible">
        {onContinue && (
          <Pill
            theme="contact"
            variant="primary"
            onClick={onContinue}
            disabled={continueDisabled || loading}
            className="normal-case tracking-normal gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden />
                Sending
              </>
            ) : (
              <>
                {continueLabel}
                <ArrowRight size={14} aria-hidden />
              </>
            )}
          </Pill>
        )}
      </div>
    </div>
    </div>
  )
}
