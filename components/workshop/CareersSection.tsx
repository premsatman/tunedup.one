import Link from 'next/link'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import { ArrowUpRight } from 'lucide-react'

const openRoles = [
  {
    title: 'Designer',
    type: 'Freelance / Part-time',
    description: 'Brand identity, UI/UX, digital design',
  },
  {
    title: 'Developer',
    type: 'Freelance / Part-time',
    description: 'Next.js, React Native, full-stack',
  },
  {
    title: 'Content & Copywriter',
    type: 'Freelance',
    description: 'Brand voice, web copy, long-form content',
  },
]

export default function CareersSection() {
  return (
    <ContainerSection id="careers">
      <MonoLabel className="mb-4 block">/ Careers</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        Sometimes all you need is the right <HighlightWord>people</HighlightWord> by your side.
      </h2>

      <p className="mt-6 max-w-xl font-body leading-relaxed text-[var(--ink-mid)]">
        We&apos;re not actively hiring right now — but we love meeting talented people early. If
        your work is strong and your values align, we&apos;ll remember you when the right project
        comes along.
      </p>

      <div className="mt-12 border-t border-[var(--line)]">
        {openRoles.map((role, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 border-b border-[var(--line)] py-6 md:flex-row md:items-center"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-bold">{role.title}</h3>
                <span className="rounded-full border border-[var(--line)] bg-[var(--canvas)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">
                  {role.type}
                </span>
              </div>
              <p className="mt-1 font-body text-sm text-[var(--ink-soft)]">{role.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                Keep on file
              </span>
              <Link
                href="/contact?branch=join"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--canvas)] transition-transform hover:scale-[1.02]"
              >
                Introduce yourself
                <ArrowUpRight size={12} aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        Don&apos;t see your role? Send a note anyway via{' '}
        <Link
          href="/contact?branch=join"
          className="underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
        >
          the contact page
        </Link>
        .
      </p>
    </ContainerSection>
  )
}
