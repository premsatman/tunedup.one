# TunedUp — Case Study Detail Page (Full Rewrite)
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> This REPLACES the existing /work/[slug] detail page with a new 20-section structure.
> Light canvas throughout (not dark like the previous version).
> Modeled after Designmonks editorial case study layout.
> Follow design system. No new npm packages required.

---

## CRITICAL CONTEXT — READ FIRST

You previously built `/work/[slug]/page.tsx` with a DARK theme and
SOHub-style alternating headlines + image blocks. That structure is
being RETIRED.

The new structure is:
- LIGHT CANVAS background throughout (`var(--canvas)` #EEF1F0)
- Editorial design-dissertation flow (problem → solution → process → outcome)
- 20 conditional sections rendered in a fixed order
- Modeled after Designmonks case study format

**Before you start:**
1. The Sanity schema has been completely rewritten — verify the new
   fields exist in `studio/schemas/caseStudy.ts` by viewing the file
2. Updated queries are in `lib/sanity/queries.ts`
3. Existing components in `components/work-detail/` should be DELETED:
   - MissionBriefHero.tsx (old version)
   - TelemetryBar.tsx
   - StoryStatement.tsx
   - ImageBlock.tsx
   - WideImageStrip.tsx
   - ApproachText.tsx
   - OutcomesBlock.tsx (will be replaced)
   - DeviceMockups.tsx
   - TechnicalSpec.tsx
   - NextMissionNav.tsx will be KEPT (slight modification)

Pause and confirm the Sanity schema is updated before writing any code.

---

## DESIGN SYSTEM REMINDER

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

Fonts:
- `font-display` Space Grotesk 700 — display headlines
- `font-body` DM Sans 400/500 — body text
- `font-mono` JetBrains Mono 400/500 — labels, tags, codenames

All shared components exist: `MonoLabel`, `HighlightWord`, `Pill`,
`ContainerSection`.

---

## NEW FILE STRUCTURE

DELETE these files (old detail page):
```
components/work-detail/MissionBriefHero.tsx
components/work-detail/TelemetryBar.tsx
components/work-detail/StoryStatement.tsx
components/work-detail/ImageBlock.tsx
components/work-detail/WideImageStrip.tsx
components/work-detail/ApproachText.tsx
components/work-detail/OutcomesBlock.tsx
components/work-detail/DeviceMockups.tsx
components/work-detail/TechnicalSpec.tsx
```

KEEP and modify:
```
components/work-detail/NextMissionNav.tsx  ← keep, light theme conversion
```

CREATE these new files:
```
components/work-detail/
├── CaseHeader.tsx               ← 01: Service pills + duration bar at top
├── CaseHero.tsx                 ← 02: Hero image + title + tagline + telemetry
├── WeWorkedOn.tsx               ← 03: Service category cards with tags
├── ColorPaletteStrip.tsx        ← 04: Color swatches
├── ProjectDescription.tsx       ← 05: Rich text + 06: hero image #2
├── ProblemSection.tsx           ← 07: Problem description + 3 cards + 08: mockup pair
├── SolutionSection.tsx          ← 09: Solution description + 3 cards + 10: mockup 3-up
├── DesignProcess.tsx            ← 11: Process description + 12: Gantt timeline
├── GanttTimeline.tsx            ← The Gantt component (used by DesignProcess)
├── TheSystem.tsx                ← 13: Typography + components + mockup pair + wireframes
├── OutcomesStrip.tsx            ← 14: Big number outcomes
├── WorkflowScenario.tsx         ← 15: Steps with screenshots
├── ClientFeedback.tsx           ← 16: Quote + photo
├── WhatsNext.tsx                ← 17: Ongoing work tag (optional)
├── RelatedMissions.tsx          ← 18: 2 related case studies
└── (NextMissionNav.tsx — kept)  ← 19: Prev/Next bottom nav
```

---

## 1. UPDATE: `app/work/[slug]/page.tsx`

Completely replace the existing file:

```tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import {
  missionBySlugQuery,
  allMissionSlugsQuery,
  autoRelatedMissionsQuery,
} from '@/lib/sanity/queries'

import CaseHeader from '@/components/work-detail/CaseHeader'
import CaseHero from '@/components/work-detail/CaseHero'
import WeWorkedOn from '@/components/work-detail/WeWorkedOn'
import ColorPaletteStrip from '@/components/work-detail/ColorPaletteStrip'
import ProjectDescription from '@/components/work-detail/ProjectDescription'
import ProblemSection from '@/components/work-detail/ProblemSection'
import SolutionSection from '@/components/work-detail/SolutionSection'
import DesignProcess from '@/components/work-detail/DesignProcess'
import TheSystem from '@/components/work-detail/TheSystem'
import OutcomesStrip from '@/components/work-detail/OutcomesStrip'
import WorkflowScenario from '@/components/work-detail/WorkflowScenario'
import ClientFeedback from '@/components/work-detail/ClientFeedback'
import WhatsNext from '@/components/work-detail/WhatsNext'
import RelatedMissions from '@/components/work-detail/RelatedMissions'
import NextMissionNav from '@/components/work-detail/NextMissionNav'

export async function generateStaticParams() {
  const missions = await client.fetch(allMissionSlugsQuery)
  return missions.map((m: any) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const mission = await client.fetch(missionBySlugQuery, {
    slug: params.slug,
  })
  if (!mission) return {}
  return {
    title: `${mission.title} — TunedUp Workshop`,
    description: mission.tagline,
  }
}

export const revalidate = 60

export default async function MissionDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const [mission, allMissions] = await Promise.all([
    client.fetch(missionBySlugQuery, { slug: params.slug }),
    client.fetch(allMissionSlugsQuery),
  ])

  if (!mission) notFound()

  // Auto-pick related missions if not manually set
  let related = mission.relatedMissions
  if (!related || related.length < 2) {
    const auto = await client.fetch(autoRelatedMissionsQuery, {
      currentSlug: params.slug,
    })
    related = auto
  }

  // Prev/Next from full list
  const currentIndex = allMissions.findIndex(
    (m: any) => m.slug === params.slug
  )
  const prev = currentIndex > 0 ? allMissions[currentIndex - 1] : null
  const next =
    currentIndex < allMissions.length - 1
      ? allMissions[currentIndex + 1]
      : null

  return (
    <div className="bg-[var(--canvas)]">
      <CaseHeader mission={mission} />
      <CaseHero mission={mission} />
      <WeWorkedOn workedOn={mission.workedOn} />
      <ColorPaletteStrip palette={mission.colorPalette} />
      <ProjectDescription
        description={mission.projectDescription}
        heroImage2={mission.heroImage2}
      />
      <ProblemSection
        description={mission.problemDescription}
        cards={mission.problemCards}
        mockups={mission.mockupPair1}
      />
      <SolutionSection
        description={mission.solutionDescription}
        cards={mission.solutionCards}
        mockups={mission.mockup3Up}
      />
      <DesignProcess
        description={mission.designProcessDescription}
        timeline={mission.projectTimeline}
      />
      <TheSystem
        typographyImage={mission.styleGuideTypography}
        componentsImage={mission.styleGuideComponents}
        mockupPair={mission.mockupPair2}
        wireframes={mission.wireframes}
      />
      <OutcomesStrip outcomes={mission.outcomes} />
      <WorkflowScenario
        description={mission.workflowDescription}
        steps={mission.workflowSteps}
      />
      <ClientFeedback feedback={mission.clientFeedback} />
      <WhatsNext text={mission.whatsNext} />
      <RelatedMissions missions={related} />
      <NextMissionNav prev={prev} next={next} />
    </div>
  )
}
```

---

## 2. `components/work-detail/CaseHeader.tsx`

Top bar above the hero. Service pill row + duration + status.
This sits above the hero image and feels like a film credit slate.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'

const CATEGORY_LABELS: Record<string, string> = {
  'brand-identity': 'Brand & Identity',
  'development': 'Development',
  'design': 'Design',
  'marketing': 'Marketing',
  'strategy': 'Strategy',
  'automation': 'Automation',
}

export default function CaseHeader({ mission }: { mission: any }) {
  if (!mission) return null

  return (
    <section className="pt-32 lg:pt-40 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top row — codename + status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              {mission.missionCodename}
            </span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
            {mission.year}
          </span>
        </div>

        {/* Service pill row */}
        <div className="flex flex-wrap items-center gap-3">
          {mission.workedOn?.map((item: any) => (
            <span
              key={item.category}
              className="font-mono text-xs uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] rounded-full px-4 py-1.5"
            >
              {CATEGORY_LABELS[item.category] || item.category}
            </span>
          ))}

          {/* Duration pill */}
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] ml-auto">
            {mission.duration}
          </span>
        </div>
      </div>
    </section>
  )
}
```

---

## 3. `components/work-detail/CaseHero.tsx`

Massive title + tagline + telemetry strip + full-bleed hero image.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export default function CaseHero({ mission }: { mission: any }) {
  if (!mission) return null

  return (
    <section className="pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.93] tracking-[-0.03em] max-w-5xl">
          {mission.title}
        </h1>

        {/* Tagline */}
        {mission.tagline && (
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--ink-soft)] mt-6 max-w-3xl leading-snug">
            {mission.tagline}
          </p>
        )}

        {/* Telemetry strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[var(--line)]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Client
            </div>
            <div className="font-body text-sm">{mission.clientName}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Sector
            </div>
            <div className="font-body text-sm">{mission.sector}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Role
            </div>
            <div className="font-body text-sm">{mission.role}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-1">
              /Frequency Tuned
            </div>
            <div className="font-body text-sm">{mission.frequencyTuned}</div>
          </div>
        </div>
      </div>

      {/* Hero image — full bleed */}
      {mission.heroImage && (
        <div className="relative aspect-[16/9] lg:aspect-[21/9] mt-16 overflow-hidden">
          <Image
            src={urlFor(mission.heroImage).width(2400).url()}
            alt={mission.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
```

---

## 4. `components/work-detail/WeWorkedOn.tsx`

Service category cards. One card per category with tag pills inside.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

const CATEGORY_LABELS: Record<string, string> = {
  'brand-identity': 'Brand Identity',
  'development': 'Development',
  'design': 'Design',
  'marketing': 'Marketing',
  'strategy': 'Strategy',
  'automation': 'Automation',
}

const CATEGORY_NUMBERS: Record<string, string> = {
  'brand-identity': '/01',
  'development': '/02',
  'design': '/03',
  'marketing': '/04',
  'strategy': '/05',
  'automation': '/06',
}

export default function WeWorkedOn({ workedOn }: { workedOn: any[] }) {
  if (!workedOn?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ We worked on</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-12">
        What we built and shipped.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {workedOn.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[var(--line)] rounded-2xl p-6 lg:p-8 flex flex-col gap-4"
          >
            {/* Category number + title */}
            <div className="flex items-baseline justify-between">
              <h3 className="font-display font-bold text-2xl lg:text-3xl">
                {CATEGORY_LABELS[item.category] || item.category}
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                {CATEGORY_NUMBERS[item.category] || `/0${i + 1}`}
              </span>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="font-mono text-xs bg-[var(--canvas)] border border-[var(--line)] rounded-full px-3 py-1 text-[var(--ink-mid)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

---

## 5. `components/work-detail/ColorPaletteStrip.tsx`

Horizontal color swatches with hex codes. Visceral, no preamble.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function ColorPaletteStrip({
  palette,
}: {
  palette: any[]
}) {
  if (!palette?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Color Palette</MonoLabel>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {palette.map((color, i) => (
          <div key={i} className="flex flex-col">
            <div
              className="aspect-square rounded-xl border border-[var(--line)]"
              style={{ backgroundColor: color.hex }}
            />
            <div className="mt-3">
              <div className="font-body text-sm font-medium">
                {color.name}
              </div>
              <div className="font-mono text-xs text-[var(--ink-soft)] uppercase">
                {color.hex}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

---

## 6. `components/work-detail/ProjectDescription.tsx`

Rich text description + hero image #2.

```tsx
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed mb-4">
        {children}
      </p>
    ),
  },
}

export default function ProjectDescription({
  description,
  heroImage2,
}: {
  description: any
  heroImage2: any
}) {
  if (!description) return null

  return (
    <>
      <ContainerSection>
        <MonoLabel className="block mb-4">/ Project Description</MonoLabel>
        <div className="max-w-3xl">
          <PortableText value={description} components={ptComponents} />
        </div>
      </ContainerSection>

      {heroImage2 && (
        <section className="pb-8">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <Image
              src={urlFor(heroImage2).width(2400).url()}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}
    </>
  )
}
```

---

## 7. `components/work-detail/ProblemSection.tsx`

Description + 1–3 problem cards + 2-up mockup pair.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function ProblemSection({
  description,
  cards,
  mockups,
}: {
  description: string
  cards: any[]
  mockups: any[]
}) {
  if (!description) return null

  return (
    <>
      <ContainerSection>
        <MonoLabel className="block mb-4">/ Problem</MonoLabel>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-6">
          What we set out to fix.
        </h2>
        <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed max-w-3xl mb-12">
          {description}
        </p>

        {/* Problem cards */}
        {cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--line)] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Problem {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-xl">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-[var(--ink-mid)] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </ContainerSection>

      {/* Mockup pair */}
      {mockups?.length === 2 && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 gap-4">
              {mockups.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
                >
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

---

## 8. `components/work-detail/SolutionSection.tsx`

Description + 1–3 solution cards + 3-up mockup row.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function SolutionSection({
  description,
  cards,
  mockups,
}: {
  description: string
  cards: any[]
  mockups: any[]
}) {
  if (!description) return null

  return (
    <>
      <ContainerSection>
        <MonoLabel className="block mb-4">/ Solution</MonoLabel>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-6">
          How we tuned it.
        </h2>
        <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed max-w-3xl mb-12">
          {description}
        </p>

        {/* Solution cards — accent background */}
        {cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Solution {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-xl">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-[var(--ink-mid)] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </ContainerSection>

      {/* Mockup 3-up */}
      {mockups?.length === 3 && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockups.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
                >
                  <Image
                    src={urlFor(img).width(1000).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

---

## 9. `components/work-detail/DesignProcess.tsx`

Process description + Gantt timeline component.

```tsx
import { PortableText } from '@portabletext/react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import GanttTimeline from './GanttTimeline'

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed mb-4">
        {children}
      </p>
    ),
  },
}

export default function DesignProcess({
  description,
  timeline,
}: {
  description: any
  timeline: any[]
}) {
  if (!description) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Design Process</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-6">
        Research, strategy, build, ship.
      </h2>

      <div className="max-w-3xl mb-12">
        <PortableText value={description} components={ptComponents} />
      </div>

      {/* Gantt */}
      {timeline?.length > 0 && <GanttTimeline phases={timeline} />}
    </ContainerSection>
  )
}
```

---

## 10. `components/work-detail/GanttTimeline.tsx`

The real Gantt chart. Horizontal phase bars. Each phase has its
own row and a colored bar showing duration. Week markers at the top.

```tsx
type Phase = {
  phaseName: string
  startWeek: number
  durationWeeks: number
  color: string
}

const COLOR_CLASSES: Record<string, string> = {
  teal: 'bg-[var(--accent)]',
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-400',
  violet: 'bg-violet-400',
  lime: 'bg-lime-400',
  cyan: 'bg-cyan-400',
  amber: 'bg-amber-400',
}

export default function GanttTimeline({ phases }: { phases: Phase[] }) {
  if (!phases?.length) return null

  // Calculate total weeks
  const totalWeeks = Math.max(
    ...phases.map((p) => p.startWeek + p.durationWeeks - 1)
  )
  const weekMarkers = Array.from({ length: totalWeeks }, (_, i) => i + 1)

  return (
    <div className="bg-white border border-[var(--line)] rounded-2xl p-6 lg:p-8 overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Week markers row */}
        <div className="flex items-center gap-0 pl-32 border-b border-[var(--line)] pb-3 mb-3">
          {weekMarkers.map((w) => (
            <div
              key={w}
              className="flex-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)] text-center"
            >
              W{w}
            </div>
          ))}
        </div>

        {/* Phase rows */}
        <div className="space-y-3">
          {phases.map((phase, i) => {
            const leftPercent = ((phase.startWeek - 1) / totalWeeks) * 100
            const widthPercent = (phase.durationWeeks / totalWeeks) * 100

            return (
              <div key={i} className="flex items-center gap-3">
                {/* Phase label */}
                <div className="w-32 flex-shrink-0">
                  <div className="font-body text-sm font-medium">
                    {phase.phaseName}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--ink-soft)] uppercase tracking-wider">
                    W{phase.startWeek} → W
                    {phase.startWeek + phase.durationWeeks - 1}
                  </div>
                </div>

                {/* Bar track */}
                <div className="flex-1 relative h-8 bg-[var(--canvas)] rounded-lg overflow-hidden">
                  <div
                    className={`absolute top-0 bottom-0 rounded-lg flex items-center px-3 ${
                      COLOR_CLASSES[phase.color] || COLOR_CLASSES.teal
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/70 truncate">
                      {phase.durationWeeks}w
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

---

## 11. `components/work-detail/TheSystem.tsx`

Style guide section — typography + components + mockup pair + wireframes.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function TheSystem({
  typographyImage,
  componentsImage,
  mockupPair,
  wireframes,
}: {
  typographyImage: any
  componentsImage: any
  mockupPair: any[]
  wireframes: any[]
}) {
  if (!typographyImage) return null

  return (
    <>
      <ContainerSection>
        <MonoLabel className="block mb-4">/ The System We Built</MonoLabel>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-12">
          Style guide, components, screens.
        </h2>

        {/* Typography + components grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-[var(--line)] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[var(--line)]">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                /Typography
              </div>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src={urlFor(typographyImage).width(1200).url()}
                alt="Typography showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {componentsImage && (
            <div className="bg-white border border-[var(--line)] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[var(--line)]">
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                  /Components
                </div>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={urlFor(componentsImage).width(1200).url()}
                  alt="Component showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </ContainerSection>

      {/* Mockup pair after style guide */}
      {mockupPair?.length === 2 && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 gap-4">
              {mockupPair.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
                >
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Wireframes 3-up */}
      {wireframes?.length === 3 && (
        <ContainerSection>
          <MonoLabel className="block mb-4">/ Wireframe & UI Design</MonoLabel>
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-12">
            From sketch to ship.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wireframes.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
              >
                <Image
                  src={urlFor(img).width(1000).url()}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </ContainerSection>
      )}
    </>
  )
}
```

---

## 12. `components/work-detail/OutcomesStrip.tsx`

Big numbers. Dark panel for contrast.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function OutcomesStrip({
  outcomes,
}: {
  outcomes: any[]
}) {
  if (!outcomes?.length) return null

  return (
    <section className="py-20 lg:py-24 bg-[var(--dark)] my-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            / Outcomes
          </span>
        </div>

        <div
          className={`grid gap-10 lg:gap-8 ${
            outcomes.length === 3
              ? 'grid-cols-2 md:grid-cols-3'
              : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {outcomes.map((outcome, i) => (
            <div key={i}>
              <div className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.04em] text-[#F5F1E8]">
                {outcome.number}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[rgba(245,241,232,0.5)] mt-3 leading-relaxed">
                {outcome.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 13. `components/work-detail/WorkflowScenario.tsx`

3–5 step user journey with screenshots. Alternating layout
(image left/right) for visual rhythm.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function WorkflowScenario({
  description,
  steps,
}: {
  description: string
  steps: any[]
}) {
  if (!description) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Workflow Scenario</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-6">
        How it actually works.
      </h2>
      <p className="font-body text-base md:text-lg text-[var(--ink-mid)] leading-relaxed max-w-3xl mb-16">
        {description}
      </p>

      <div className="space-y-16 lg:space-y-24">
        {steps?.map((step, i) => {
          const imageOnRight = i % 2 === 0
          return (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Text — order depends on row */}
              <div
                className={`${
                  imageOnRight ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
                  Step {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                  {step.stepTitle}
                </h3>
                <p className="font-body text-base text-[var(--ink-mid)] leading-relaxed">
                  {step.stepDescription}
                </p>
              </div>

              {/* Screenshot */}
              {step.screenshot && (
                <div
                  className={`relative aspect-[9/16] max-h-[600px] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)] ${
                    imageOnRight ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <Image
                    src={urlFor(step.screenshot).width(800).url()}
                    alt={step.stepTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ContainerSection>
  )
}
```

---

## 14. `components/work-detail/ClientFeedback.tsx`

Single testimonial. Photo + quote + attribution.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { Quote } from 'lucide-react'

export default function ClientFeedback({
  feedback,
}: {
  feedback: any
}) {
  if (!feedback?.quote) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Client Feedback</MonoLabel>

      <div className="bg-white border border-[var(--line)] rounded-3xl p-8 lg:p-16 max-w-5xl">
        <Quote
          size={48}
          className="text-[var(--accent)] mb-6"
          strokeWidth={1.5}
        />

        <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug tracking-[-0.01em] text-[var(--ink)] mb-10">
          "{feedback.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          {feedback.authorPhoto && (
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--canvas)] flex-shrink-0">
              <Image
                src={urlFor(feedback.authorPhoto).width(200).url()}
                alt={feedback.authorName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-display font-bold text-base">
              {feedback.authorName}
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-0.5">
              {feedback.authorRole} · {feedback.authorOrg}
            </div>
          </div>
        </div>
      </div>
    </ContainerSection>
  )
}
```

---

## 15. `components/work-detail/WhatsNext.tsx`

Small inline section. Shows only when there's ongoing work.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import { Radio } from 'lucide-react'

export default function WhatsNext({ text }: { text: string }) {
  if (!text) return null

  return (
    <ContainerSection>
      <div className="bg-[var(--accent-soft)] border border-[var(--accent)] rounded-2xl p-6 lg:p-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <Radio
            size={16}
            className="text-[var(--accent)] animate-pulse"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            / Signal still active
          </span>
        </div>
        <p className="font-display text-xl md:text-2xl leading-snug">
          {text}
        </p>
      </div>
    </ContainerSection>
  )
}
```

---

## 16. `components/work-detail/RelatedMissions.tsx`

Two related case studies. Card layout.

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { ArrowUpRight } from 'lucide-react'

export default function RelatedMissions({
  missions,
}: {
  missions: any[]
}) {
  if (!missions?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Related Missions</MonoLabel>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-12">
        Other signals worth tuning into.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {missions.slice(0, 2).map((m) => (
          <Link
            key={m._id}
            href={`/work/${m.slug}`}
            className="group bg-white border border-[var(--line)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {m.heroImage && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={urlFor(m.heroImage).width(1200).url()}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                  {m.missionCodename}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {m.title}
                  </h3>
                  {m.tagline && (
                    <p className="font-body text-sm text-[var(--ink-soft)] line-clamp-2">
                      {m.tagline}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[var(--ink-soft)] group-hover:text-[var(--accent)] flex-shrink-0 mt-1 transition-colors"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ContainerSection>
  )
}
```

---

## 17. UPDATE: `components/work-detail/NextMissionNav.tsx`

The existing NextMissionNav was built for dark theme. Convert to light:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type MissionRef = {
  title: string
  slug: string
  missionCodename?: string
  heroImage?: any
}

export default function NextMissionNav({
  prev,
  next,
}: {
  prev: MissionRef | null
  next: MissionRef | null
}) {
  return (
    <section className="border-t border-[var(--line)] mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Prev */}
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-72 flex items-end p-8"
          >
            {prev.heroImage && (
              <>
                <Image
                  src={urlFor(prev.heroImage).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={14} className="text-white/70" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  Previous Mission
                </span>
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-[var(--canvas)]" />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-72 flex items-end p-8 md:border-l border-[var(--line)]"
          >
            {next.heroImage && (
              <>
                <Image
                  src={urlFor(next.heroImage).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </>
            )}
            <div className="relative z-10 md:text-right md:ml-auto">
              <div className="flex items-center gap-2 mb-2 md:justify-end">
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                  Next Mission
                </span>
                <ArrowRight size={14} className="text-white/70" />
              </div>
              <div className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">
                {next.title}
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/work"
            className="group flex items-center justify-center h-72 md:border-l border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--accent-soft)] transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition-colors">
              View all missions →
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
```

---

## 18. UPDATE: Navbar — remove dark mode detection

The previous prompt added dark theme detection on `/work/[slug]` pages.
Now the detail pages are LIGHT, so the navbar should look the same as
other pages. In `components/layout/Navbar.tsx`, remove the `isDark`
logic — it's no longer needed.

Find and remove:
```tsx
const pathname = usePathname()
const isDark = pathname.startsWith('/work/') && pathname !== '/work'
```

And remove any conditional `isDark ? ... : ...` styling tied to it.

---

## EXECUTION ORDER FOR CURSOR

```
CHECKPOINT 0 — Confirm Sanity schema
  Open studio/schemas/caseStudy.ts
  Verify the new fields exist:
    workedOn, colorPalette, projectDescription, heroImage2,
    problemDescription, problemCards, mockupPair1,
    solutionDescription, solutionCards, mockup3Up,
    designProcessDescription, projectTimeline,
    styleGuideTypography, styleGuideComponents,
    mockupPair2, wireframes, outcomes,
    workflowDescription, workflowSteps,
    clientFeedback, whatsNext, relatedMissions
  Open lib/sanity/queries.ts
  Verify missionBySlugQuery returns all the new fields.
  If anything is missing, STOP and tell me. I will provide the schema first.

CHECKPOINT 1 — Delete old components
  Delete these files:
    components/work-detail/MissionBriefHero.tsx
    components/work-detail/TelemetryBar.tsx
    components/work-detail/StoryStatement.tsx
    components/work-detail/ImageBlock.tsx
    components/work-detail/WideImageStrip.tsx
    components/work-detail/ApproachText.tsx
    components/work-detail/OutcomesBlock.tsx
    components/work-detail/DeviceMockups.tsx
    components/work-detail/TechnicalSpec.tsx
  Confirm done. I will review.

CHECKPOINT 2 — Build header + hero + worked on
  Build:
    CaseHeader.tsx
    CaseHero.tsx
    WeWorkedOn.tsx
    ColorPaletteStrip.tsx
  Show me these four files. I will review.

CHECKPOINT 3 — Build description + problem + solution
  Build:
    ProjectDescription.tsx
    ProblemSection.tsx
    SolutionSection.tsx
  Show me these three files. I will review.

CHECKPOINT 4 — Build process + Gantt + system
  Build:
    GanttTimeline.tsx
    DesignProcess.tsx
    TheSystem.tsx
  Show me these three files. I will review.

CHECKPOINT 5 — Build outcomes + workflow + feedback
  Build:
    OutcomesStrip.tsx
    WorkflowScenario.tsx
    ClientFeedback.tsx
  Show me these three files. I will review.

CHECKPOINT 6 — Build whats next + related + update prev/next
  Build:
    WhatsNext.tsx
    RelatedMissions.tsx
  Update:
    NextMissionNav.tsx (convert to light theme)
  Show me these files. I will review.

CHECKPOINT 7 — Update Navbar
  Remove the dark-theme detection on /work/[slug] routes.
  Show me the updated Navbar. I will review.

CHECKPOINT 8 — Update the page
  Replace app/work/[slug]/page.tsx with the new composition.
  Run npm run dev → navigate to a case study URL.
  Tell me what renders. I'll guide what to fix.

CHECKPOINT 9 — Test
  Test on a case study with FULL data — every section renders.
  Test on a case study with PARTIAL data — empty sections hide gracefully.
  Test on mobile 375px — all sections usable.
  Test Gantt timeline — bars render correctly across week range.
  Test related missions — auto-pick works when no manual selection.
  Run npm run build — no TypeScript errors.
```

---

## NON-NEGOTIABLE RULES

1. **Light canvas throughout.** Background is `var(--canvas)`. Only the
   OutcomesStrip is dark (intentional contrast block in the middle of
   the page). NO other section uses `var(--dark)`.

2. **Every section is conditional.** If the data doesn't exist, the
   section doesn't render. Each component starts with a null check at
   the top.

3. **Server components only.** None of these components need `'use client'`.
   All rendering is static. No state, no event handlers.

4. **Sanity images via `urlFor()`.** Never use raw image URLs.

5. **No new npm packages.** Everything uses existing dependencies:
   next/image, framer-motion (already), lucide-react (already),
   @portabletext/react (already).

6. **Mobile first.** Every grid collapses to 1 column on mobile.
   The Gantt is horizontally scrollable on small screens
   (already handled in the component).

7. **Pause after each checkpoint.** Show output before continuing.

8. **No `any` types** except for Sanity image objects (acceptable
   compromise — Sanity's image type imports are verbose).

---

## SAMPLE CASE STUDY CONTENT (for testing)

Use this when filling in your first real case study in Sanity Studio.
This is "Song Boom" — your church worship app — as a complete example:

```
META & HEADER
  Mission Title:        Song Boom — Offline Worship App
  Mission Codename:     JELC-WORSHIP-01
  Mission Type:         Ministry
  Status:               Active
  Duration:             6 months
  Year:                 2024 — Ongoing
  Featured:             Yes

HERO & INTRO
  Tagline:              5,000 worshippers carrying their hymnal —
                        offline, in three languages, in their pocket.
  Frequency Tuned:      Offline-first reliability
  Client Name:          JELC Synod (Andhra Pradesh)
  Sector:               Ministry / Religious Tech
  Role:                 Mobile App + Brand + Content

WE WORKED ON
  Card 1:
    Category:           Brand Identity
    Tags:               Logo Design, Typography, Voice & Tone,
                        Color Palette, Iconography
  Card 2:
    Category:           Design
    Tags:               UX Research, UI Design, Mobile Design,
                        Design System, Prototyping
  Card 3:
    Category:           Development
    Tags:               React Native, Offline-first, API Integration,
                        Performance Optimization

COLOR PALETTE
  Liturgical Teal:      #27B7A5
  Sanctuary Ink:        #0A0A0A
  Communion Cream:      #F5F1E8
  Vesper Violet:        #6B4FBB
  Sunday Gold:          #E6B84A

PROJECT DESCRIPTION (rich text — 2-3 paragraphs):
  JELC Synod approached us with a problem most churches face but
  few have solved: their congregation of 5,000+ Odia Lutheran
  worshippers needed access to liturgy and hymnody in three
  languages — but most villages had unreliable internet.

  We built Song Boom — a mobile app that works completely offline.
  The entire hymnal, daily liturgy, and Bible readings are bundled
  with the app. Updates sync when internet is available, but the
  app never breaks when it isn't.

  Three languages — Odia, English, Telugu — switchable in one tap.
  Search across hymns and scripture. Adjustable text size for older
  worshippers. We tested it with the Bishop's wife on her parents'
  phone in their village.

THE PROBLEM
  Description: Most worship apps require constant internet. In rural
  Odisha, that's a non-starter. The existing options were either
  paywalled (out of reach for village pastors) or in English only.

  Card 1:
    Title:        Unreliable Internet
    Description:  Villages have 2G at best. Worship apps that load
                  cloud content fail during the service.
  Card 2:
    Title:        Language Gap
    Description:  Most apps offer English. Odia liturgy was missing
                  from every digital platform we tested.
  Card 3:
    Title:        Older Worshippers
    Description:  The 60+ generation needed larger text, simpler
                  navigation, and no learning curve.

(... continue with solution, process, system, outcomes etc.)

OUTCOMES
  10,000+               Downloads
  3                     Languages
  100%                  Offline-capable
  ~5,000                Active worshippers

CLIENT FEEDBACK
  Quote:        "We've never had so many people singing along.
                The older members tell us they can finally read
                the hymn book without their glasses."
  Author:       Rev. Daniel Behera
  Role:         Senior Pastor
  Organisation: JELC Andhra Pradesh
```
