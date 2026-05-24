import MonoLabel from '@/components/shared/MonoLabel'

const reasons = [
  {
    code: '/01',
    headline: 'Small enough to know your name.',
    highlight: 'know your name',
    body: "You'll always know who's doing your work. We don't rotate accounts or hand you off to juniors after the first call.",
  },
  {
    code: '/02',
    headline: 'We understand your mission.',
    highlight: 'your mission',
    body: 'We serve churches, NGOs, and founders — not everyone. That specificity means we ask better questions and make fewer wrong assumptions.',
  },
  {
    code: '/03',
    headline: 'We stay after launch.',
    highlight: 'after launch',
    body: "Most agencies disappear the day the site goes live. We're the crew still watching the telemetry six months later.",
  },
  {
    code: '/04',
    headline: 'We tune, not guess.',
    highlight: 'not guess',
    body: "Every decision is tied to a goal you gave us. We don't do creative vibes — we do measurable craft.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--dark)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <MonoLabel className="mb-4 block !text-[rgba(245,241,232,0.4)]">/ Why TunedUp</MonoLabel>
        <h2 className="mb-16 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#F5F1E8] md:text-5xl lg:text-6xl">
          Four honest reasons to{' '}
          <span className="text-[rgba(245,241,232,0.4)]">work with us.</span>
        </h2>

        <div className="grid grid-cols-1 gap-px bg-white/8 md:grid-cols-2">
          {reasons.map((reason) => {
            const parts = reason.headline.split(reason.highlight)
            return (
              <div key={reason.code} className="bg-[var(--dark)] p-8 lg:p-12">
                <div className="mb-6 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  {reason.code}
                </div>
                <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-[#F5F1E8] md:text-3xl">
                  {parts[0]}
                  <span className="text-[rgba(245,241,232,0.4)]">{reason.highlight}</span>
                  {parts[1]}
                </h3>
                <p className="max-w-sm font-body leading-relaxed text-[rgba(245,241,232,0.6)]">
                  {reason.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
