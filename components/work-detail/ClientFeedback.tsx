import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import WorkDetailIntro from '@/components/work-detail/WorkDetailIntro'
import type { ClientFeedback as ClientFeedbackType } from '@/lib/types/mission'

export default function ClientFeedback({
  feedback,
}: {
  feedback?: ClientFeedbackType
}) {
  if (!feedback?.quote) return null

  const hasPhoto = hasSanityImage(feedback.authorPhoto)
  const hasLogo = hasSanityImage(feedback.clientLogo)
  const hasAttribution = Boolean(feedback.authorName || feedback.authorRole || feedback.authorOrg)

  return (
    <>
      <WorkDetailIntro title="Client Feedback" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12" />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-12 lg:pb-20">
        <div
          className={`mx-auto flex max-w-5xl overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2rem] lg:rounded-[2.25rem] ${
            hasPhoto ? 'flex-col md:flex-row md:items-stretch' : 'flex-col'
          }`}
        >
          {hasPhoto && feedback.authorPhoto && (
            <div className="relative h-56 w-full shrink-0 sm:h-64 md:h-auto md:min-h-full md:w-[min(38%,260px)] lg:w-[min(34%,300px)] xl:w-[320px]">
              <Image
                src={urlFor(feedback.authorPhoto).width(800).url()}
                alt={feedback.authorName ?? 'Client photo'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 260px, 320px"
                className="object-cover object-center"
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-8 lg:gap-10 lg:p-10">
            <div>
              <svg
                width={56}
                height={56}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mb-5 text-[var(--ink)] sm:mb-6"
                aria-hidden
              >
                <path d="M6 17h3l2-4V7H5v6h3z" />
              </svg>
              <blockquote className="font-display text-xl leading-snug tracking-[-0.01em] text-[var(--ink)] md:text-2xl lg:text-3xl">
                {feedback.quote}
              </blockquote>
            </div>

            <div className="flex flex-row items-center justify-between gap-4 md:border-t md:border-[var(--line)] md:pt-6 lg:grid lg:grid-cols-2 lg:items-end lg:gap-8">
              {hasAttribution && (
                <div className="min-w-0 flex-1">
                  {feedback.authorName && (
                    <div className="font-display text-base font-bold text-[var(--ink)] md:text-lg">
                      {feedback.authorName}
                    </div>
                  )}
                  {feedback.authorOrg && (
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                      {feedback.authorOrg}
                    </div>
                  )}
                  {feedback.authorRole && (
                    <div className="mt-1 font-body text-sm text-[var(--ink-mid)]">
                      {feedback.authorRole}
                    </div>
                  )}
                </div>
              )}

              {hasLogo && feedback.clientLogo && (
                <div className="relative h-10 w-28 shrink-0 sm:h-12 sm:w-36 md:ml-auto lg:w-44">
                  <Image
                    src={urlFor(feedback.clientLogo).width(400).url()}
                    alt={feedback.authorOrg ?? 'Client company logo'}
                    fill
                    sizes="(max-width: 640px) 112px, 176px"
                    className="object-contain object-right"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
