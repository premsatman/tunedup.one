import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import Link from 'next/link'

const pills = [
  { label: 'Websites', color: 'bg-pink-400 text-pink-950' },
  { label: 'Branding', color: 'bg-yellow-400 text-yellow-950' },
  { label: 'Google Ads', color: 'bg-orange-400 text-orange-950' },
  { label: 'Mobile Apps', color: 'bg-cyan-400 text-cyan-950' },
  { label: 'Automation', color: 'bg-lime-400 text-lime-950' },
  { label: 'Strategy', color: 'bg-white text-black border border-[var(--line)]' },
  { label: 'NGO Ad Grants', color: 'bg-violet-400 text-violet-950' },
  { label: 'SEO', color: 'bg-amber-400 text-amber-950' },
]

export default function CapabilitiesPills() {
  return (
    <ContainerSection className="bg-[var(--canvas)]">
      <MonoLabel className="mb-4 block">/ Capabilities</MonoLabel>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        Websites, branding, ads, apps, automation & strategy.
      </h2>

      <div className="mt-16 flex min-h-[420px] flex-col items-center justify-center gap-8 rounded-3xl bg-[var(--dark)] p-10 lg:p-16">
        <div className="flex max-w-3xl flex-wrap justify-center gap-4">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`${pill.color} cursor-default select-none rounded-full px-7 py-3.5 font-display text-xl font-bold md:text-2xl`}
            >
              {pill.label}
            </span>
          ))}

          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-white transition-transform hover:scale-[1.02]"
          >
            Start a project →
          </Link>
        </div>
      </div>
    </ContainerSection>
  )
}
