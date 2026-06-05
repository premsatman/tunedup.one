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

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-14 lg:px-12 lg:pb-20">
        <div
          className={`mx-auto flex max-w-5xl overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2rem] lg:rounded-[2.25rem] ${
            hasPhoto ? 'flex-row items-stretch' : 'flex-col'
          }`}
        >
          {hasPhoto && feedback.authorPhoto && (
            <>
              <div className="flex w-[5.75rem] shrink-0 items-center justify-center self-stretch px-3 py-5 sm:w-[7rem] sm:px-4 sm:py-6 md:w-[8.5rem] lg:hidden">
                <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <Image
                    src={urlFor(feedback.authorPhoto).width(400).url()}
                    alt={feedback.authorName ?? 'Client photo'}
                    fill
                    sizes="(max-width: 640px) 72px, (max-width: 1024px) 96px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative hidden shrink-0 lg:block lg:min-h-full lg:w-[min(34%,300px)] xl:w-[320px]">
                <Image
                  src={urlFor(feedback.authorPhoto).width(800).url()}
                  alt={feedback.authorName ?? 'Client photo'}
                  fill
                  sizes="(max-width: 1280px) 300px, 320px"
                  className="object-cover object-center"
                />
              </div>
            </>
          )}

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 py-5 pl-0 pr-4 sm:gap-6 sm:py-6 sm:pr-6 lg:gap-10 lg:p-10">
            <div>
              <svg
                width={56}
                height={56}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mb-4 text-[var(--ink)] sm:mb-5 lg:mb-6"
                aria-hidden
              >
                <path d="M6 17h3l2-4V7H5v6h3z" />
              </svg>
              <blockquote className="font-display text-lg leading-snug tracking-[-0.01em] text-[var(--ink)] sm:text-xl md:text-2xl lg:text-3xl">
                {feedback.quote}
              </blockquote>
            </div>

            <div className="flex flex-row items-center justify-between gap-4 lg:border-t lg:border-[var(--line)] lg:pt-6 lg:grid lg:grid-cols-2 lg:items-end lg:gap-8">
              {hasAttribution && (
                <div className="min-w-0 flex-1">
                  {feedback.authorName && (
                    <div className="font-display text-sm font-bold text-[var(--ink)] sm:text-base md:text-lg">
                      {feedback.authorName}
                    </div>
                  )}
                  {feedback.authorOrg && (
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] sm:text-xs">
                      {feedback.authorOrg}
                    </div>
                  )}
                  {feedback.authorRole && (
                    <div className="mt-1 font-body text-xs text-[var(--ink-mid)] sm:text-sm">
                      {feedback.authorRole}
                    </div>
                  )}
                </div>
              )}

              {hasLogo && feedback.clientLogo && (
                <div className="relative h-12 w-32 shrink-0 sm:h-14 sm:w-40 md:h-16 md:w-48 lg:ml-auto lg:h-[4.5rem] lg:w-56">
                  <Image
                    src={urlFor(feedback.clientLogo).width(600).url()}
                    alt={feedback.authorOrg ?? 'Client company logo'}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 224px"
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
