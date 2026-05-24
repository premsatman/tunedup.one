# TunedUp — Workshop Page (/workshop)
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> Builds the /workshop page — about, founder, team, capabilities, recognition, careers.
> Light canvas throughout. Follows existing design system exactly.
> No new dependencies.

---

## CONTEXT

The `/workshop` page is the "About" page for TunedUp Digital.
It tells the story of who we are, who leads the team, why clients
should choose us, and who the crew is.

It is NOT a dark page — light canvas `#EEF1F0` throughout,
same as the homepage. The only dark elements are the
CapabilitiesPills panel and the Showreel panel (same as SOHub).

The page is for pastors, NGO directors, founders, and startup
teams who want to know if they can trust TunedUp before engaging.

---

## DESIGN SYSTEM — same as all other pages

```css
--canvas: #EEF1F0
--ink: #0A0A0A
--ink-mid: #2A2A2A
--ink-soft: #B8B5AE
--accent: #27B7A5
--accent-soft: rgba(39, 183, 165, 0.12)
--dark: #0B0B0D
--line: rgba(10,10,10,0.08)
```

Fonts: `font-display` Space Grotesk 700 / `font-body` DM Sans /
`font-mono` JetBrains Mono

All shared components already exist:
`BrokenWordHero`, `MonoLabel`, `HighlightWord`, `Pill`,
`PropImage`, `ContainerSection`, `PageGutter`

---

## FILE STRUCTURE TO CREATE

```
app/
└── workshop/
    └── page.tsx                          ← page composition

components/
└── workshop/
    ├── WorkshopHero.tsx                  ← broken-word hero
    ├── FounderSection.tsx                ← founder story + brand associations
    ├── WhyChooseUs.tsx                   ← 4 reasons section
    ├── CrewSection.tsx                   ← team grid from Sanity
    ├── CapabilitiesPills.tsx             ← floating colored pill cluster
    ├── RecognitionList.tsx               ← stacked client/work rows
    └── CareersSection.tsx                ← join the workshop
```

---

## SANITY — team data

Team members already exist in Sanity under `teamMember` schema.
Query already in `lib/sanity/queries.ts`:

```ts
export const allTeamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo, tags
  }
`
```

If `bio` and `tags` fields don't exist on the schema yet, add them:

```ts
defineField({
  name: 'bio',
  title: 'Short bio',
  type: 'text',
  description: '2–3 sentences max',
}),
defineField({
  name: 'tags',
  title: 'Skill tags',
  type: 'array',
  of: [{ type: 'string' }],
  description: '3–5 skill tags e.g. Strategy, Branding, Next.js',
}),
defineField({
  name: 'linkedIn',
  title: 'LinkedIn URL',
  type: 'url',
}),
defineField({
  name: 'isFounder',
  title: 'Is this the founder?',
  type: 'boolean',
  initialValue: false,
}),
```

The founder (Prem) gets `isFounder: true` — the FounderSection
component queries separately for the founder record.

Also add a `brandAssociation` array to the founder's record:

```ts
defineField({
  name: 'brandAssociations',
  title: 'Brand Associations',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'brandName', type: 'string', title: 'Brand Name' },
        { name: 'logo', type: 'image', title: 'Brand Logo' },
        { name: 'screenshot', type: 'image', title: 'Work Screenshot' },
        { name: 'oneLiner', type: 'string', title: 'One sentence description' },
        { name: 'role', type: 'string', title: 'Your role' },
      ],
    },
  ],
  description: 'Notable brands you have worked with',
}),
defineField({
  name: 'founderBio',
  title: 'Founder long bio',
  type: 'array',
  of: [{ type: 'block' }],
  description: 'Rich text bio for the founder section',
}),
defineField({
  name: 'founderTitle',
  title: 'Founder display title',
  type: 'string',
  description: 'e.g. "Founder & Lead Strategist"',
}),
defineField({
  name: 'yearsExperience',
  title: 'Years of experience',
  type: 'number',
}),
```

Add a new query for founder:

```ts
export const founderQuery = groq`
  *[_type == "teamMember" && isFounder == true][0] {
    _id,
    name,
    role,
    founderTitle,
    bio,
    founderBio,
    photo,
    tags,
    linkedIn,
    yearsExperience,
    brandAssociations[] {
      brandName,
      logo,
      screenshot,
      oneLiner,
      role,
    }
  }
`
```

---

## PAGE COMPOSITION — `app/workshop/page.tsx`

Server component. Fetches team and founder from Sanity.

```tsx
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { allTeamQuery, founderQuery } from '@/lib/sanity/queries'
import WorkshopHero from '@/components/workshop/WorkshopHero'
import FounderSection from '@/components/workshop/FounderSection'
import WhyChooseUs from '@/components/workshop/WhyChooseUs'
import CrewSection from '@/components/workshop/CrewSection'
import CapabilitiesPills from '@/components/workshop/CapabilitiesPills'
import RecognitionList from '@/components/workshop/RecognitionList'
import CareersSection from '@/components/workshop/CareersSection'

export const metadata: Metadata = {
  title: 'The Workshop — TunedUp Digital',
  description:
    'Meet the crew behind TunedUp. A small team obsessed with making missions sound the way founders hear them in their head.',
}

export const revalidate = 60

export default async function WorkshopPage() {
  const [team, founder] = await Promise.all([
    client.fetch(allTeamQuery),
    client.fetch(founderQuery),
  ])

  return (
    <>
      <WorkshopHero />
      <FounderSection founder={founder} />
      <WhyChooseUs />
      <CrewSection team={team} />
      <CapabilitiesPills />
      <RecognitionList />
      <CareersSection />
    </>
  )
}
```

---

## 1. `components/workshop/WorkshopHero.tsx`

Uses existing `BrokenWordHero`. Helmet prop.

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function WorkshopHero() {
  return (
    <BrokenWordHero
      word="workshop"
      propSrc="/props/prop-studio.png"
      propAlt="TunedUp Crew Helmet — STN-A440"
      subline={
        <>
          We thrive on <HighlightWord>resonance.</HighlightWord>
        </>
      }
      propPosition="right"
    />
  )
}
```

---

## 2. `components/workshop/FounderSection.tsx`

The most important section on the page. Tells Prem's story
with depth, warmth, and credibility. Three sub-sections:

**2a — Personal intro block**
**2b — Brand associations (World Vision etc.)**
**2c — Years + stat strip**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import { Linkedin } from 'lucide-react'

export default function FounderSection({ founder }: { founder: any }) {
  if (!founder) return null

  return (
    <ContainerSection id="founder">

      {/* --- 2a: Personal intro --- */}
      <MonoLabel className="block mb-4">/ Founder</MonoLabel>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left — photo */}
        <div className="lg:col-span-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--ink-soft)]">
            {founder.photo && (
              <Image
                src={urlFor(founder.photo).width(800).url()}
                alt={founder.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Name + title below photo */}
          <div className="mt-6">
            <h2 className="font-display font-bold text-3xl">
              {founder.name}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-1">
              {founder.founderTitle || founder.role}
            </p>

            {/* LinkedIn */}
            {founder.linkedIn && (
              <Link
                href={founder.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </Link>
            )}

            {/* Skill tags */}
            {founder.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {founder.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="font-mono text-xs uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — bio + stats */}
        <div className="lg:col-span-8">

          {/* Big display statement */}
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-2xl">
            We are a <HighlightWord>small team</HighlightWord> obsessed
            with making missions sound the way founders hear them
            in their heads.
          </h2>

          {/* Rich bio */}
          {founder.founderBio ? (
            <div className="mt-8 space-y-4 max-w-xl">
              <PortableText
                value={founder.founderBio}
                components={{
                  block: {
                    normal: ({ children }: any) => (
                      <p className="font-body text-base text-[var(--ink-mid)] leading-relaxed">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          ) : founder.bio ? (
            <p className="font-body text-base text-[var(--ink-mid)] leading-relaxed mt-8 max-w-xl">
              {founder.bio}
            </p>
          ) : null}

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[var(--line)]">
            {[
              {
                number: `${founder.yearsExperience || 14}+`,
                label: 'Years of craft',
              },
              {
                number: '4',
                label: 'Mission types served',
              },
              {
                number: '3',
                label: 'Continents reached',
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]">
                  {stat.number}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2b: Brand associations --- */}
      {founder.brandAssociations?.length > 0 && (
        <div className="mt-24 pt-16 border-t border-[var(--line)]">
          <MonoLabel className="block mb-4">/ Notable associations</MonoLabel>
          <h3 className="font-display font-bold text-3xl md:text-4xl max-w-2xl mb-12">
            Work that reached{' '}
            <HighlightWord>further</HighlightWord> than the brief.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founder.brandAssociations.map((brand: any, i: number) => (
              <div
                key={i}
                className="bg-[var(--canvas)] border border-[var(--line)] rounded-2xl overflow-hidden"
              >
                {/* Screenshot */}
                {brand.screenshot && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={urlFor(brand.screenshot).width(800).url()}
                      alt={brand.brandName}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Brand logo */}
                    {brand.logo && (
                      <div className="relative h-6 w-16 flex-shrink-0">
                        <Image
                          src={urlFor(brand.logo).width(200).url()}
                          alt={brand.brandName}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    )}
                    <span className="font-display font-bold text-base">
                      {brand.brandName}
                    </span>
                  </div>

                  {brand.role && (
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2">
                      {brand.role}
                    </div>
                  )}

                  {brand.oneLiner && (
                    <p className="font-body text-sm text-[var(--ink-mid)] leading-relaxed">
                      {brand.oneLiner}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ContainerSection>
  )
}
```

---

## 3. `components/workshop/WhyChooseUs.tsx`

Four honest reasons. Dark background panel — stands out
in the light-canvas page flow. Each reason is one bold
statement + one supporting sentence.

**Hardcoded content — do not pull from Sanity.**

The four reasons:

```
/01  Small enough to know your name.
     You'll always know who's doing your work.
     We don't rotate accounts or hand you off to juniors.

/02  We understand your mission.
     We serve churches, NGOs, and founders — not everyone.
     That specificity means we ask better questions
     and make fewer assumptions.

/03  We stay after launch.
     Most agencies disappear the day the site goes live.
     We're the team still watching the telemetry
     six months later.

/04  We tune, not guess.
     Every decision we make is tied to a goal you gave us.
     We don't do "creative vibes" — we do measurable craft.
```

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

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
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <MonoLabel className="block mb-4 !text-[rgba(245,241,232,0.4)]">
          / Why TunedUp
        </MonoLabel>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#F5F1E8] max-w-3xl mb-16">
          Four honest reasons to{' '}
          <span className="text-[rgba(245,241,232,0.4)]">work with us.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
          {reasons.map((reason) => {
            const parts = reason.headline.split(reason.highlight)
            return (
              <div
                key={reason.code}
                className="bg-[var(--dark)] p-8 lg:p-12"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-6">
                  {reason.code}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F1E8] leading-tight mb-4">
                  {parts[0]}
                  <span className="text-[rgba(245,241,232,0.4)]">
                    {reason.highlight}
                  </span>
                  {parts[1]}
                </h3>
                <p className="font-body text-[rgba(245,241,232,0.6)] leading-relaxed max-w-sm">
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
```

---

## 4. `components/workshop/CrewSection.tsx`

Team grid. Pulls from Sanity. Excludes the founder
(shown separately above). Cards with photo, name,
role, bio, and skill tags.

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import { Linkedin } from 'lucide-react'

export default function CrewSection({ team }: { team: any[] }) {
  // Exclude founder from crew grid — shown in FounderSection
  const crew = team?.filter((m) => !m.isFounder) ?? []

  return (
    <ContainerSection id="crew">
      <MonoLabel className="block mb-4">/ The Crew</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-3xl">
        The operators{' '}
        <HighlightWord>behind the station.</HighlightWord>
      </h2>

      {crew.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {crew.map((member) => (
            <div
              key={member._id}
              className="bg-[var(--canvas)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--ink-soft)] transition-colors"
            >
              {/* Photo */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--ink-soft)] mb-6">
                {member.photo ? (
                  <Image
                    src={urlFor(member.photo).width(600).url()}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-6xl text-[var(--canvas)]">
                    {member.name?.[0]}
                  </div>
                )}
              </div>

              {/* Name + role */}
              <h3 className="font-display font-bold text-xl">
                {member.name}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-1">
                {member.role}
              </p>

              {/* Bio */}
              {member.bio && (
                <p className="font-body text-sm text-[var(--ink-mid)] mt-4 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              )}

              {/* Tags */}
              {member.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* LinkedIn */}
              {member.linkedIn && (
                <Link
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  <Linkedin size={12} />
                  LinkedIn
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Graceful empty state */
        <div className="mt-16 max-w-lg">
          <p className="font-body text-[var(--ink-soft)]">
            A small crew. Big on craft. Team details coming soon.
          </p>
        </div>
      )}
    </ContainerSection>
  )
}
```

---

## 5. `components/workshop/CapabilitiesPills.tsx`

SOHub's floating colored pill cluster on a dark panel.
Same pattern as the homepage CapabilitiesStack but visual
and colorful — service names as big floating pills.

**Hardcoded — no Sanity needed.**

```tsx
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
      <MonoLabel className="block mb-4">/ Capabilities</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-3xl">
        Websites, branding, ads, apps,
        automation & strategy.
      </h2>

      {/* Dark panel with floating pills */}
      <div className="bg-[var(--dark)] rounded-3xl mt-16 p-10 lg:p-16 min-h-[420px] flex flex-col items-center justify-center gap-8">
        {/* Pill cluster */}
        <div className="flex flex-wrap gap-4 justify-center max-w-3xl">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`${pill.color} font-display font-bold text-xl md:text-2xl rounded-full px-7 py-3.5 cursor-default select-none`}
            >
              {pill.label}
            </span>
          ))}

          {/* CTA pill */}
          <Link
            href="/contact"
            className="bg-[var(--accent)] text-white font-mono text-sm uppercase tracking-wider rounded-full px-7 py-3.5 flex items-center gap-2 hover:scale-[1.02] transition-transform"
          >
            Start a project →
          </Link>
        </div>
      </div>
    </ContainerSection>
  )
}
```

---

## 6. `components/workshop/RecognitionList.tsx`

Stacked rows listing past clients and notable work.
SOHub's recognition pattern — left: client name,
right: what was done + duration.

**Partially hardcoded + partially from Sanity.**
For now hardcode the list — it can be moved to Sanity later.

```tsx
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
  // Add more as they come
]

export default function RecognitionList() {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Recognition</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-4xl">
        From churches to clinics —
        we tune what <HighlightWord>matters.</HighlightWord>
      </h2>

      <div className="mt-16 border-t border-[var(--line)]">
        {recognitions.map((item, i) => (
          <div
            key={i}
            className="group flex items-center justify-between py-6 border-b border-[var(--line)] hover:bg-[var(--accent-soft)] transition-colors px-2 -mx-2 rounded cursor-default"
          >
            <span className="font-display font-bold text-xl md:text-2xl">
              {item.left}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] text-right ml-4">
              {item.right}
            </span>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

---

## 7. `components/workshop/CareersSection.tsx`

Not actively hiring but open to meeting talented people.
SOHub has "Apply" button rows — yours is warmer and
honest about the current status.

**Hardcoded — no Sanity needed for now.**

```tsx
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
    status: 'keep-on-file',
  },
  {
    title: 'Developer',
    type: 'Freelance / Part-time',
    description: 'Next.js, React Native, full-stack',
    status: 'keep-on-file',
  },
  {
    title: 'Content & Copywriter',
    type: 'Freelance',
    description: 'Brand voice, web copy, long-form content',
    status: 'keep-on-file',
  },
]

export default function CareersSection() {
  return (
    <ContainerSection id="careers">
      <MonoLabel className="block mb-4">/ Careers</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-3xl">
        Sometimes all you need is the right{' '}
        <HighlightWord>people</HighlightWord> by your side.
      </h2>

      <p className="font-body text-[var(--ink-mid)] mt-6 max-w-xl leading-relaxed">
        We're not actively hiring right now — but we love meeting
        talented people early. If your work is strong and your
        values align, we'll remember you when the right project
        comes along.
      </p>

      {/* Role rows */}
      <div className="mt-12 border-t border-[var(--line)]">
        {openRoles.map((role, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[var(--line)] gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-xl">
                  {role.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] rounded-full px-3 py-1 text-[var(--ink-soft)]">
                  {role.type}
                </span>
              </div>
              <p className="font-body text-sm text-[var(--ink-soft)] mt-1">
                {role.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                Keep on file
              </span>
              <Link
                href="/contact?branch=join"
                className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--canvas)] rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:scale-[1.02] transition-transform"
              >
                Introduce yourself
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* General note */}
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-8">
        Don't see your role? Send a note anyway via{' '}
        <Link
          href="/contact?branch=join"
          className="underline underline-offset-4 hover:text-[var(--ink)] transition-colors"
        >
          the contact page
        </Link>
        .
      </p>
    </ContainerSection>
  )
}
```

---

## EXECUTION ORDER FOR CURSOR

```
CHECKPOINT 1 — Schema + queries
  1. Add new fields to teamMember schema in
     studio/schemas/teamMember.ts:
     bio, tags, linkedIn, isFounder,
     brandAssociations, founderBio, founderTitle,
     yearsExperience
  2. Add founderQuery to lib/sanity/queries.ts
  Show me updated schema and queries. I will review.

CHECKPOINT 2 — Static components first
  3. Build WorkshopHero.tsx
  4. Build WhyChooseUs.tsx (hardcoded — no Sanity)
  5. Build CapabilitiesPills.tsx (hardcoded — no Sanity)
  6. Build RecognitionList.tsx (hardcoded — no Sanity)
  7. Build CareersSection.tsx (hardcoded — no Sanity)
  Show me these files. I will review before continuing.

CHECKPOINT 3 — Data-driven components
  8. Build FounderSection.tsx
  9. Build CrewSection.tsx
  10. Build app/workshop/page.tsx
  Run npm run dev → navigate to /workshop
  Show me what renders. I will review.

CHECKPOINT 4 — Test + polish
  11. Test on mobile 375px — all sections readable
  12. Test with empty Sanity data (founder not filled in)
      → page should not break — graceful fallback
  13. Test WhyChooseUs dark section — text readable,
      borders visible
  14. Test CapabilitiesPills — pills visible,
      CTA pill links to /contact
  15. Run npm run build — no TypeScript errors

CHECKPOINT 5 — Sanity content prompt
  After build passes, prompt me:
  "Please fill in the following in Sanity Studio
   at /admin to complete the Workshop page:
   → Set isFounder: true on Prem's record
   → Add founderTitle: 'Founder & Lead Strategist'
   → Add yearsExperience: 14
   → Add founderBio (rich text bio)
   → Add brandAssociations (World Vision + others)
   → Add team bio and tags for each crew member
   → Add LinkedIn URLs for each team member"
```

---

## CONTENT TO FILL IN SANITY (after build)

Cursor will prompt you — but here's what you need to
write ahead of time so you're ready:

### Founder bio (founderBio — rich text, 3 paragraphs)

Write this yourself in your voice. Suggested structure:

```
Para 1: Where you started — the ministry connection,
         the 14 years, why you care about this work.
         e.g. "I started TunedUp because I spent years
         watching good missions run on bad websites.
         Pastors who couldn't afford agencies. NGOs with
         powerful stories nobody could find..."

Para 2: What you actually do — the workshop metaphor,
         the hands-on nature, the small team by choice.

Para 3: What drives you — the church app with 5,000
         worshippers, the hospital that kept calling back
         for 14 years, the NGO that got found because
         someone finally explained what they did properly.
```

### Brand associations

For each brand (World Vision, etc.) prepare:
- Brand name
- Your role (e.g. "Digital Campaign Lead", "Web Strategist")
- One screenshot (the work you did — even a screen grab)
- One sentence: *"Supported World Vision's India digital
  campaign reaching 40,000 registered donors."*
  Keep it factual, specific, honest about your role.

---

## NON-NEGOTIABLE RULES

1. **Light canvas throughout.** `var(--canvas)` bg on all sections
   except `WhyChooseUs` (dark) and `CapabilitiesPills` panel (dark).
   Never use `#0B0B0D` outside those two sections.

2. **Founder section renders even with empty Sanity data.**
   All fields conditional — `if (!founder) return null` at top level,
   all nested fields checked before rendering.

3. **No `any` types** except Sanity image objects.

4. **`'use client'`** is NOT needed on any of these components.
   All are server components — no useState, no event handlers
   except Links.

5. **Pause after each checkpoint.** Show output before continuing.

6. **Mobile first.** 12-column founder grid collapses to 1 column.
   Crew cards stack to 1 column on mobile. Recognition rows
   stack label/value vertically on mobile under 480px.
