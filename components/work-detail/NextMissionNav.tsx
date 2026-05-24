import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { MissionSlugItem } from '@/lib/types/mission'

export default function NextMissionNav({
  prev,
  next,
}: {
  prev: MissionSlugItem | null
  next: MissionSlugItem | null
}) {
  return (
    <section className="mt-8 border-t border-[var(--line)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group relative flex aspect-[4/3] items-end overflow-hidden p-8 md:aspect-auto md:h-72"
          >
            {prev.heroImage && (
              <>
                <Image
                  src={urlFor(prev.heroImage).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </>
            )}
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <ArrowLeft size={14} className="text-white/70" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  Previous Mission
                </span>
              </div>
              <div className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-white" />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group flex aspect-[4/3] flex-col justify-end bg-white p-8 transition-colors hover:bg-[var(--accent-soft)] md:aspect-auto md:h-72 md:border-l md:border-[var(--line)]"
          >
            <div className="md:ml-auto md:text-right">
              <div className="mb-2 flex items-center gap-2 md:justify-end">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] transition-colors group-hover:text-[var(--ink-mid)]">
                  Next Mission
                </span>
                <ArrowRight
                  size={14}
                  className="text-[var(--ink-soft)] transition-colors group-hover:text-[var(--ink)]"
                />
              </div>
              <div className="font-display text-2xl font-bold leading-tight text-[var(--ink)] md:text-3xl">
                {next.title}
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/work"
            className="group flex h-72 items-center justify-center border-[var(--line)] bg-white transition-colors hover:bg-[var(--accent-soft)] md:border-l"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] transition-colors group-hover:text-[var(--ink)]">
              View all missions →
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
