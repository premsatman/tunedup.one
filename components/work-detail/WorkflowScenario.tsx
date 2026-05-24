import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import type { WorkflowStep } from '@/lib/types/mission'

export default function WorkflowScenario({
  description,
  steps,
}: {
  description?: string
  steps?: WorkflowStep[]
}) {
  if (!description) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Workflow Scenario</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-6">
        How it actually works.
      </h2>
      <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed max-w-3xl mb-16">
        {description}
      </p>

      <div className="space-y-16 lg:space-y-24">
        {steps?.map((step, i) => {
          const imageOnRight = i % 2 === 0
          return (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div
                className={`${imageOnRight ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
                  Step {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                  {step.stepTitle}
                </h3>
                <p className="font-body text-base text-[var(--ink-mid)] leading-relaxed">
                  {step.stepDescription}
                </p>
              </div>

              {step.screenshot && (
                <div
                  className={`relative aspect-[9/16] max-h-[600px] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)] ${
                    imageOnRight ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <Image
                    src={urlFor(step.screenshot).width(800).url()}
                    alt={step.stepTitle ?? ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ContainerSection>
  )
}
