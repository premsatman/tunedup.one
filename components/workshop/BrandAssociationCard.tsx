import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'
import type { BrandAssociation } from '@/lib/types/team'

type LinkState =
  | { kind: 'external'; href: string }
  | { kind: 'internal'; href: string }
  | { kind: 'static' }

const getLinkState = (association: BrandAssociation): LinkState => {
  const liveUrl = association.liveUrl?.trim()
  if (liveUrl) return { kind: 'external', href: liveUrl }

  const caseStudySlug = association.caseStudySlug?.trim()
  if (caseStudySlug) return { kind: 'internal', href: `/work/${caseStudySlug}` }

  return { kind: 'static' }
}

type BrandAssociationCardProps = {
  brand: BrandAssociation
}

const BrandAssociationCard = ({ brand }: BrandAssociationCardProps) => {
  const link = getLinkState(brand)
  const isLink = link.kind !== 'static'
  const brandLabel = brand.brandName || 'Brand'

  const cardClasses = clsx(
    'group relative flex flex-col rounded-2xl border border-[var(--line)]',
    'bg-[var(--canvas)] overflow-hidden transition-all duration-200',
    isLink &&
      'hover:border-[var(--ink)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
  )

  const arrow = isLink && (
    <span
      aria-hidden="true"
      className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--canvas)]/80 text-[var(--ink-soft)] backdrop-blur-sm transition-colors duration-200 group-hover:border-[var(--ink)] group-hover:text-[var(--ink)]"
    >
      {link.kind === 'external' ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
    </span>
  )

  const inner = (
    <>
      {arrow}

      {brand.screenshot && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--canvas)]">
          <Image
            src={urlFor(brand.screenshot).width(800).url()}
            alt={brand.brandName || 'Brand work'}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 p-5 md:p-6">
        <div className="flex items-center gap-3">
          {brand.logo && (
            <div className="relative h-6 w-16 flex-shrink-0">
              <Image
                src={urlFor(brand.logo).width(200).url()}
                alt={brand.brandName || ''}
                fill
                className="object-contain object-left"
              />
            </div>
          )}
          {brand.brandName && (
            <h3 className="font-display text-base font-bold text-[var(--ink)] md:text-lg">
              {brand.brandName}
            </h3>
          )}
        </div>

        {brand.role && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] md:text-xs">
            {brand.role}
          </p>
        )}

        {brand.oneLiner && (
          <p className="font-body text-sm leading-relaxed text-[var(--ink-mid)]">{brand.oneLiner}</p>
        )}
      </div>
    </>
  )

  if (link.kind === 'external') {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${brandLabel} (opens in a new tab)`}
        className={cardClasses}
      >
        {inner}
      </a>
    )
  }

  if (link.kind === 'internal') {
    return (
      <Link
        href={link.href}
        aria-label={`View the ${brandLabel} case study`}
        className={cardClasses}
      >
        {inner}
      </Link>
    )
  }

  return <div className={cardClasses}>{inner}</div>
}

export default BrandAssociationCard
