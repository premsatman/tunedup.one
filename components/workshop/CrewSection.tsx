import Link from 'next/link'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import TeamMemberPhoto from '@/components/workshop/TeamMemberPhoto'
import { Linkedin } from 'lucide-react'
import type { TeamMemberRecord } from '@/lib/types/team'

export default function CrewSection({ team }: { team: TeamMemberRecord[] }) {
  const crew = team ?? []

  return (
    <ContainerSection id="crew">
      <MonoLabel className="mb-4 block">/ The Crew</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        The operators <HighlightWord>behind the station.</HighlightWord>
      </h2>

      {crew.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {crew.map((member) => (
            <div
              key={member._id}
              className="flex min-w-0 flex-col rounded-2xl border border-[var(--line)] bg-[var(--canvas)] p-5 transition-colors hover:border-[var(--ink-soft)] md:p-6"
            >
              <div className="relative mb-5 aspect-square overflow-hidden rounded-xl bg-white md:mb-6">
                <TeamMemberPhoto
                  member={member}
                  alt={member.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-top"
                  variant="crew"
                />
              </div>

              <h3 className="font-display text-lg font-bold md:text-xl">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                {member.role}
              </p>

              {member.bio && (
                <p className="mt-4 line-clamp-3 font-body text-sm leading-relaxed text-[var(--ink-mid)]">
                  {member.bio}
                </p>
              )}

              {member.tags && member.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-[var(--canvas)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {member.linkedIn && (
                <Link
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  <Linkedin size={12} aria-hidden />
                  LinkedIn
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 max-w-lg">
          <p className="font-body text-[var(--ink-soft)]">
            A small crew. Big on craft. Team details coming soon.
          </p>
        </div>
      )}
    </ContainerSection>
  )
}
