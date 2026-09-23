import Link from 'next/link'
import type { ReactNode } from 'react'
import { legalBusiness } from '@/lib/legal'

type LegalDocumentProps = {
  eyebrow: string
  title: string
  highlight: string
  intro: ReactNode
  children: ReactNode
}

export const LegalDocument = ({
  eyebrow,
  title,
  highlight,
  intro,
  children,
}: LegalDocumentProps) => (
  <article className="page-gutter pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-40">
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-wide text-[var(--ink-soft)]">{eyebrow}</p>
      <h1 className="text-title-section mt-4 text-[var(--ink)]">
        {title} <span className="text-[var(--ink-soft)]">{highlight}</span>
      </h1>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-[var(--ink-mid)]">
        Last updated {legalBusiness.updated}
      </p>
      <div className="mt-8 space-y-4 font-body text-base leading-relaxed text-[var(--ink-mid)] md:text-lg">
        {intro}
      </div>
      <div className="mt-14 space-y-12">{children}</div>
    </div>
  </article>
)

type LegalSectionProps = {
  id: string
  index: number
  title: string
  children: ReactNode
}

export const LegalSection = ({ id, index, title, children }: LegalSectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
    <h2
      id={`${id}-heading`}
      className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] md:text-3xl"
    >
      <span className="mr-3 font-mono text-sm font-normal text-[var(--ink-soft)]">
        /{String(index).padStart(2, '0')}
      </span>
      {title}
    </h2>
    <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-[var(--ink-mid)] md:text-lg">
      {children}
    </div>
  </section>
)

export const LegalList = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-2 pl-5">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

export const LegalLink = ({
  href,
  children,
  external = false,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) => {
  const className =
    'text-[var(--ink)] underline decoration-[var(--accent)] underline-offset-4 transition-opacity hover:opacity-70'

  if (external || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
