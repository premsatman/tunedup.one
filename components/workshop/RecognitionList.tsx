import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

const recognitions = [
  {
    left: 'World Vision',
    right: 'Digital Campaign · International NGO',
  },
  {
    left: 'Sharon Church — Odia Lutheran',
    right: 'Song Boom App · 10,000+ Downloads',
  },
  {
    left: 'Hospital Group — Hyderabad',
    right: 'Patient Acquisition · 14 Years',
  },
  {
    left: 'PS.Today Devotional',
    right: '365-Day · 3 Languages · Self-Published',
  },
  {
    left: 'Transformation Night',
    right: 'Event Campaign · Live',
  },
]

export default function RecognitionList() {
  return (
    <ContainerSection>
      <MonoLabel className="mb-4 block">/ Recognition</MonoLabel>
      <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
        From churches to clinics — we tune what <HighlightWord>matters.</HighlightWord>
      </h2>

      <div className="mt-16 border-t border-[var(--line)]">
        {recognitions.map((item, index) => (
          <div
            key={index}
            className="group -mx-2 flex cursor-default flex-col items-start justify-between gap-2 rounded border-b border-[var(--line)] px-2 py-6 transition-colors hover:bg-[var(--accent-soft)] sm:flex-row sm:items-center"
          >
            <span className="font-display text-xl font-bold md:text-2xl">{item.left}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] sm:text-right">
              {item.right}
            </span>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
