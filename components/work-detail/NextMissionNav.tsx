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
    <section className="border-t border-[var(--line)] mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-72 flex items-end p-8"
          >
            {prev.heroImage && (
              <>
                <Image
                  src={urlFor(prev.heroImage).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={14} className="text-white/70" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  Previous Mission
                </span>
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-[var(--canvas)]" />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-72 flex items-end p-8 md:border-l border-[var(--line)]"
          >
            {next.heroImage && (
              <>
                <Image
                  src={urlFor(next.heroImage).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </>
            )}
            <div className="relative z-10 md:text-right md:ml-auto">
              <div className="flex items-center gap-2 mb-2 md:justify-end">
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  Next Mission
                </span>
                <ArrowRight size={14} className="text-white/70" />
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
                {next.title}
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/work"
            className="group flex items-center justify-center h-72 md:border-l border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--accent-soft)] transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition-colors">
              View all missions →
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
