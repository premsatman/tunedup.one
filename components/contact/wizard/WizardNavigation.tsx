'use client'

import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import Pill from '@/components/shared/Pill'

type WizardNavigationProps = {
  onBack?: () => void
  onContinue?: () => void
  continueLabel?: string
  continueDisabled?: boolean
  loading?: boolean
  showBack?: boolean
  className?: string
}

export default function WizardNavigation({
  onBack,
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  loading = false,
  showBack = true,
  className = '',
}: WizardNavigationProps) {
  return (
    <div
      className={clsx(
        'flex w-full shrink-0 items-center justify-between pt-6',
        className || 'mt-6'
      )}
    >
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
  )
}
