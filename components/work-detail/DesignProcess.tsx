import type { PortableTextBlock } from '@portabletext/types'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import WorkDetailIntro, { workDetailIntroBodyClassName } from '@/components/work-detail/WorkDetailIntro'
import type { TimelinePhase } from '@/lib/types/mission'
import GanttTimeline from './GanttTimeline'
import GanttTimelineSerpentine from './GanttTimelineSerpentine'

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={workDetailIntroBodyClassName}>{children}</p>
    ),
  },
}

export default function DesignProcess({
  description,
  timeline,
}: {
  description?: PortableTextBlock[]
  timeline?: TimelinePhase[]
}) {
  const hasDescription = Boolean(description && description.length > 0)
  const hasTimeline = Boolean(timeline && timeline.length > 0)

  if (!hasDescription && !hasTimeline) return null

  return (
    <>
      {hasDescription && (
        <WorkDetailIntro title="Design Process" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <PortableText value={description!} components={ptComponents} />
        </WorkDetailIntro>
      )}

      {hasTimeline && (
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-12 lg:pb-20">
          <div className="hidden lg:block">
            <GanttTimeline phases={timeline!} />
          </div>
          <GanttTimelineSerpentine phases={timeline!} />
        </section>
      )}
    </>
  )
}
