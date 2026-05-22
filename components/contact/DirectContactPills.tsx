'use client'

import clsx from 'clsx'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import CalendlyPopup from '@/components/contact/CalendlyPopup'
import { getCalendlyUrl } from '@/lib/getCalendlyUrl'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'prem@tunedup.one',
    href: 'mailto:prem@tunedup.one',
    description: 'For detailed briefs',
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Quick chat',
    href: 'https://wa.me/91XXXXXXXXXX',
    description: 'Fastest response',
    external: true,
  },
] as const

export default function DirectContactPills() {
  const cardClass =
    'flex flex-col gap-3 rounded-2xl border border-[var(--line)] p-6 transition-colors duration-150'

  return (
    <ContainerSection>
      <MonoLabel className="mb-4 block">/ Direct frequencies</MonoLabel>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {channels.map(({ icon: Icon, label, value, href, description, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={clsx(cardClass, 'hover:border-[var(--ink)]')}
          >
            <Icon size={24} className="text-[var(--ink)]" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-wide text-[var(--ink-soft)]">
              {label}
            </span>
            <span className="font-body text-base text-[var(--ink)]">{value}</span>
            <span className="font-mono text-xs text-[var(--ink-soft)]">{description}</span>
          </a>
        ))}

        <CalendlyPopup
          url={getCalendlyUrl()}
          className="flex w-full items-center gap-4 rounded-2xl bg-[var(--ink)] p-6 text-left text-[var(--canvas)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <Calendar size={24} className="shrink-0" aria-hidden />
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--canvas)]/70">
              Schedule
            </div>
            <div className="font-body font-medium">20 min · Free call</div>
            <div className="mt-0.5 font-mono text-xs text-[var(--canvas)]/70">
              Tue & Thu · 8:30–11:30pm IST
            </div>
          </div>
        </CalendlyPopup>
      </div>
    </ContainerSection>
  )
}
