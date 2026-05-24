import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { MissionListItem, MissionStatus } from '@/lib/types/mission'

const statusColor: Record<MissionStatus, string> = {
  complete: 'bg-[var(--accent)]',
  active: 'bg-yellow-400',
  tuning: 'bg-orange-400',
}

export default function MissionCard({
  title,
  slug,
  missionCodename,
  tagline,
  heroImage,
  status = 'complete',
  services,
  missionType,
}: MissionListItem) {
  const dotColor = statusColor[status] ?? statusColor.complete

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)]"
    >
      {heroImage && (
        <Image
          src={urlFor(heroImage).width(1200).url()}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotColor} animate-pulse`} aria-hidden />
        {missionCodename && (
          <span className="font-mono text-xs uppercase tracking-widest text-white/80">
            {missionCodename}
          </span>
        )}
      </div>

      {missionType && (
        <div className="absolute right-5 top-5">
          <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
            {missionType}
          </span>
        </div>
      )}

      <div className="absolute bottom-5 left-5 right-5">
        {services && services.length > 0 && (
          <div className="mb-3 flex translate-y-2 flex-wrap gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80"
              >
                {service}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
          {title}
        </h3>
        {tagline && (
          <p className="mt-1.5 line-clamp-2 font-body text-sm text-white/70">{tagline}</p>
        )}
      </div>
    </Link>
  )
}
