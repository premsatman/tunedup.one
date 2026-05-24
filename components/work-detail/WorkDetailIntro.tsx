import WorkDetailDescriptionReveal from '@/components/work-detail/WorkDetailDescriptionReveal'

export const workDetailIntroBodyClassName =
  'mb-5 font-body text-base leading-relaxed last:mb-0 md:text-lg lg:text-xl'

export const workDetailCardDescriptionClassName =
  'font-body text-sm leading-relaxed text-white/75'

type WorkDetailIntroProps = {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function WorkDetailIntro({
  title,
  children,
  className = '',
}: WorkDetailIntroProps) {
  return (
    <div
      className={`relative z-10 mx-auto w-full max-w-5xl px-6 py-14 text-center sm:py-16 lg:px-12 lg:py-20 ${className}`}
    >
      <h2 className="text-title-section text-balance text-white">{title}</h2>
      {children ? (
        <div className="mx-auto mt-8 max-w-4xl lg:mt-10">
          <WorkDetailDescriptionReveal>{children}</WorkDetailDescriptionReveal>
        </div>
      ) : null}
    </div>
  )
}
