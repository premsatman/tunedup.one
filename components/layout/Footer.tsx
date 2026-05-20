import Link from 'next/link'
import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
import FooterScrollButton from './FooterScrollButton'
import FooterProp from './FooterProp'
import FooterShowcase from './FooterShowcase'

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/tunedup', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/tunedup', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/tunedup', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@tunedup', label: 'YouTube' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-visible bg-[var(--canvas)] px-8 pb-8 sm:px-12 sm:pb-10 lg:px-20 xl:px-28 2xl:px-36">
      <FooterShowcase />

      <div className="relative z-10 overflow-visible rounded-[1.75rem] bg-[var(--dark)] pb-12 pt-[min(29vh,340px)] text-[var(--canvas)] sm:rounded-[2rem] sm:pt-[min(27vh,380px)] lg:rounded-[2.25rem] lg:pt-[min(25vh,420px)]">
        <FooterProp />

        <div className="relative z-10 px-4 sm:px-6 md:px-8">
          <p className="text-center font-display text-2xl md:text-3xl">
            <span className="text-[var(--ink-soft)]">©</span> TunedUp Digital
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
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--canvas)] px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-[var(--ink)] transition-transform hover:scale-105"
              >
                {label} →
              </Link>
            ))}
            <FooterScrollButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
