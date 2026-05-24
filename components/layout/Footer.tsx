import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
import Pill from '@/components/shared/Pill'
import FooterScrollButton from './FooterScrollButton'
import FooterProp from './FooterProp'
import FooterShowcase from './FooterShowcase'
import FooterShell from './FooterShell'

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/tunedup', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/tunedup', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/tunedup', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@tunedup', label: 'YouTube' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Crew', href: '/crew' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <FooterShell>
      <div className="relative w-full pt-12">
        <div className="relative aspect-[180.9/45] w-full">
          <div className="absolute inset-x-0 bottom-0 z-0">
            <FooterShowcase />
          </div>
        </div>

        <div className="relative z-10 -mt-[var(--footer-wordmark-overlap)] overflow-visible rounded-[1.75rem] bg-[var(--dark)] pb-12 pt-[min(29vh,340px)] text-[var(--canvas)] sm:rounded-[2rem] sm:pt-[min(27vh,380px)] md:-mt-[2.35rem] lg:-mt-[2.75rem] lg:rounded-[2.25rem] lg:pt-[min(25vh,420px)] xl:-mt-[clamp(3.35rem,5vw,4.35rem)] 2xl:-mt-[clamp(4.75rem,6.5vw,6.25rem)]">
          <FooterProp />

          <div className="relative z-10 px-4 sm:px-6 md:px-8">
            <p className="text-center font-display text-2xl md:text-3xl">
              <span className="text-[var(--ink-soft)]">©</span>TunedUpDigital
              <br />
              <span className="mt-3 inline-block font-mono text-sm uppercase tracking-wide text-[var(--ink-soft)]">
                Mission Control · STN-A440 · Fine Tuning Since 2024
              </span>
            </p>

            <div className="mt-12 flex justify-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--canvas)] text-[var(--ink)] transition-transform hover:scale-110"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {navLinks.map(({ label, href }) => (
                <Pill key={href} variant="outline" href={href}>
                  {label} →
                </Pill>
              ))}
              <FooterScrollButton />
            </div>
          </div>
        </div>
      </div>
    </FooterShell>
  )
}
