# TunedUp — Work Index + Mission Brief Detail Pages
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> Builds two pages: /work (mission archive index) and /work/[slug] (case study detail).
> Follow the existing design system. Detail pages are DARK — different from the light canvas homepage.
> No new dependencies unless listed.

---

## CONTEXT

We are adding two pages to the existing TunedUp Next.js 14 project:

1. `/work` — Mission Archive index. Light canvas background, matches homepage style.
   Grid of all missions with filter by mission type.

2. `/work/[slug]` — Mission Brief detail page. DARK background throughout.
   Editorial, story-first layout. Inspired by SOHub's case study pages.
   Alternates between big display statements and full-bleed image blocks.

Both pages pull data from the existing Sanity CMS via the queries
already defined in `lib/sanity/queries.ts`.

---

## DESIGN RULES — READ BEFORE WRITING ANY CODE

### Light canvas (work index page)
Same tokens as the rest of the site:
```
--canvas: #EEF1F0
--ink: #0A0A0A
--ink-soft: #B8B5AE
--accent: #27B7A5
--line: rgba(10,10,10,0.08)
```

### Dark (work detail pages — ALL sections)
```
background: #0B0B0D  (var(--dark))
primary text: #F5F1E8  (warm white — use this, not pure white)
secondary text: rgba(245,241,232,0.5)  (faded warm white)
accent: #27B7A5  (same teal — for status dots and highlights)
line: rgba(255,255,255,0.08)  (light borders on dark bg)
highlight word color: rgba(245,241,232,0.4)  (dim for HighlightWord on dark)
```

**Detail page is dark from top to bottom — Navbar included.**
When the detail page is mounted, apply a `data-theme="dark"` attribute
to the `<body>` or a wrapping `<div>` so the Navbar can detect it and
switch to its light text variant. Remove on unmount.

### Typography (same across all pages)
- `font-display` Space Grotesk 700 — all display headlines
- `font-body` DM Sans 400/500 — body text
- `font-mono` JetBrains Mono 400/500 — labels, tags, spec table

### Image handling
- All images from Sanity via `urlFor()` from `@/lib/sanity/client`
- Use `next/image` with `fill` prop inside relative containers
- Always provide `sizes` prop
- Loading: `priority` on hero images, lazy on everything else

---

## FILE STRUCTURE TO CREATE

```
app/
└── work/
    ├── page.tsx                          ← Work index (Mission Archive)
    └── [slug]/
        └── page.tsx                      ← Mission Brief detail

components/
├── work/
│   ├── WorkHero.tsx                      ← hero with prop image
│   ├── MissionGrid.tsx                   ← filterable grid (client component)
│   └── MissionCard.tsx                   ← individual card
└── work-detail/
    ├── MissionBriefHero.tsx              ← title + service tags + hero image
    ├── TelemetryBar.tsx                  ← mono metadata row
    ├── StoryStatement.tsx                ← reusable big display text block
    ├── ImageBlock.tsx                    ← asymmetric image grid
    ├── WideImageStrip.tsx                ← full-bleed single or double image
    ├── OutcomesBlock.tsx                 ← big numbers
    ├── DeviceMockups.tsx                 ← laptop + phone mockup images
    ├── TechnicalSpec.tsx                 ← mono spec table (conditional)
    ├── ApproachText.tsx                  ← body copy section
    └── NextMissionNav.tsx                ← prev/next project transition
```

---

## SANITY QUERIES

These already exist in `lib/sanity/queries.ts`. Verify they exist
and add any missing ones:

```ts
// Work index — all missions
export const allMissionsQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    heroImage,
    status,
    services,
  }
`

// Work detail — single mission by slug
export const missionBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    heroImage,
    status,
    services,
    telemetry,
    briefRich,
    storyStatement1,
    storyStatement1Highlight,
    storyStatement2,
    storyStatement2Highlight,
    storyStatement3,
    storyStatement3Highlight,
    approachRich,
    imageBlock1,
    imageBlock2,
    wideImage1,
    wideImage2,
    deviceMockups,
    technicalSpec,
    outcomes,
    gallery,
    whatsNext,
    order,
  }
`

// Adjacent missions for prev/next nav
export const allMissionSlugsQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    title,
    "slug": slug.current,
    missionCodename,
    heroImage,
    order,
  }
`
```

If `storyStatement1`, `storyStatement2`, `storyStatement3` fields don't
exist in the Sanity schema yet, add them to `studio/schemas/caseStudy.ts`:

```ts
defineField({
  name: 'storyStatement1',
  title: 'Story Statement 1 (after hero)',
  type: 'text',
  description: 'Big display headline — the opening story beat',
}),
defineField({
  name: 'storyStatement1Highlight',
  title: 'Story Statement 1 — word to highlight',
  type: 'string',
  description: 'Single word that gets the dim highlight treatment',
}),
defineField({
  name: 'storyStatement2',
  title: 'Story Statement 2 (mid-page)',
  type: 'text',
}),
defineField({
  name: 'storyStatement2Highlight',
  title: 'Story Statement 2 — word to highlight',
  type: 'string',
}),
defineField({
  name: 'storyStatement3',
  title: 'Story Statement 3 (before outcomes)',
  type: 'text',
}),
defineField({
  name: 'storyStatement3Highlight',
  title: 'Story Statement 3 — word to highlight',
  type: 'string',
}),
defineField({
  name: 'imageBlock1',
  title: 'Image Block 1 (after story statement 1)',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
  validation: Rule => Rule.max(4),
}),
defineField({
  name: 'imageBlock2',
  title: 'Image Block 2 (after story statement 2)',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
  validation: Rule => Rule.max(4),
}),
defineField({
  name: 'wideImage1',
  title: 'Wide Image 1 (cinematic strip)',
  type: 'image',
  options: { hotspot: true },
}),
defineField({
  name: 'wideImage2',
  title: 'Wide Image 2 (cinematic strip)',
  type: 'image',
  options: { hotspot: true },
}),
defineField({
  name: 'deviceMockups',
  title: 'Device Mockup Images',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
  validation: Rule => Rule.max(3),
  description: 'Laptop, phone, or tablet mockup images',
}),
defineField({
  name: 'services',
  title: 'Services (tag pills)',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      'Brand Identity',
      'Website',
      'Mobile App',
      'Google Ads',
      'SEO',
      'Workflow Automation',
      'Strategy',
      'Content',
    ],
  },
}),
```

---

## PAGE 1: Work Index — `app/work/page.tsx`

Server component. Fetches all missions from Sanity.

```tsx
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { allMissionsQuery } from '@/lib/sanity/queries'
import WorkHero from '@/components/work/WorkHero'
import MissionGrid from '@/components/work/MissionGrid'

export const metadata: Metadata = {
  title: 'Our Work — TunedUp Workshop',
  description:
    'Case studies from churches, NGOs, entrepreneurs, and startups. Each project tells a story of a mission, and the signal we helped carry.',
}

export const revalidate = 60

export default async function WorkPage() {
  const missions = await client.fetch(allMissionsQuery)

  return (
    <>
      <WorkHero />
      <MissionGrid missions={missions} />
    </>
  )
}
```

---

## `components/work/WorkHero.tsx`

Uses existing `BrokenWordHero`. Light canvas — same as homepage.

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function WorkHero() {
  return (
    <BrokenWordHero
      word="work"
      propSrc="/props/prop-work.png"
      propAlt="TunedUp Mission Sample Container"
      subline={
        <>
          The signals we've <HighlightWord>tuned.</HighlightWord>
        </>
      }
      propPosition="center"
    />
  )
}
```

---

## `components/work/MissionCard.tsx`

Individual card. Dark background with image, gradient overlay,
codename pill, title, tagline. Same pattern as homepage cards
but with hover reveal of service tags.

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

type MissionCardProps = {
  title: string
  slug: string
  missionCodename?: string
  tagline?: string
  heroImage?: any
  status?: string
  services?: string[]
  missionType?: string
}

export default function MissionCard({
  title, slug, missionCodename, tagline,
  heroImage, status, services, missionType
}: MissionCardProps) {

  const statusColor = {
    complete: 'bg-[var(--accent)]',
    active: 'bg-yellow-400',
    tuning: 'bg-orange-400',
  }[status ?? 'complete'] ?? 'bg-[var(--accent)]'

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)] block"
    >
      {/* Hero image */}
      {heroImage && (
        <Image
          src={urlFor(heroImage).width(1200).url()}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Top — codename + status dot */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
        {missionCodename && (
          <span className="font-mono text-xs uppercase tracking-widest text-white/80">
            {missionCodename}
          </span>
        )}
      </div>

      {/* Top right — mission type */}
      {missionType && (
        <div className="absolute top-5 right-5">
          <span className="font-mono text-[10px] uppercase tracking-wider bg-white/10 text-white/70 rounded-full px-3 py-1">
            {missionType}
          </span>
        </div>
      )}

      {/* Bottom — title + tagline */}
      <div className="absolute bottom-5 left-5 right-5">
        {/* Service tags — visible on hover */}
        {services && services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            {services.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-wider bg-white/15 text-white/80 rounded-full px-2.5 py-0.5"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight">
          {title}
        </h3>
        {tagline && (
          <p className="font-body text-sm text-white/70 mt-1.5 line-clamp-2">
            {tagline}
          </p>
        )}
      </div>
    </Link>
  )
}
```

---

## `components/work/MissionGrid.tsx`

Client component. Filterable grid by mission type.
Filter pills at top. 2-column grid on desktop.

```tsx
'use client'
import { useState } from 'react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'
import MissionCard from './MissionCard'

const filters = [
  { value: 'all', label: 'All Missions' },
  { value: 'ministry', label: 'Ministry' },
  { value: 'impact', label: 'Impact' },
  { value: 'solo', label: 'Solo' },
  { value: 'launch', label: 'Launch' },
]

export default function MissionGrid({ missions }: { missions: any[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? missions
    : missions.filter((m) => m.missionType === filter)

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Projects</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-4xl">
        Each mission we've flown carries a frequency it now{' '}
        <HighlightWord>broadcasts</HighlightWord> on its own.
      </h2>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-3 mt-12">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={[
              'font-mono text-xs uppercase tracking-wider rounded-full px-5 py-2.5 transition-all duration-200',
              filter === f.value
                ? 'bg-[var(--ink)] text-[var(--canvas)]'
                : 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] hover:scale-[1.02]',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {filtered.map((mission) => (
            <MissionCard key={mission._id} {...mission} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-body text-[var(--ink-soft)]">
            No missions in this category yet. Check back soon.
          </p>
        </div>
      )}
    </ContainerSection>
  )
}
```

---

## PAGE 2: Mission Brief Detail — `app/work/[slug]/page.tsx`

Server component. Dark page throughout.

```tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import {
  missionBySlugQuery,
  allMissionSlugsQuery,
} from '@/lib/sanity/queries'
import MissionBriefHero from '@/components/work-detail/MissionBriefHero'
import TelemetryBar from '@/components/work-detail/TelemetryBar'
import StoryStatement from '@/components/work-detail/StoryStatement'
import ImageBlock from '@/components/work-detail/ImageBlock'
import WideImageStrip from '@/components/work-detail/WideImageStrip'
import ApproachText from '@/components/work-detail/ApproachText'
import OutcomesBlock from '@/components/work-detail/OutcomesBlock'
import DeviceMockups from '@/components/work-detail/DeviceMockups'
import TechnicalSpec from '@/components/work-detail/TechnicalSpec'
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

  // Find prev/next
  const currentIndex = allMissions.findIndex(
    (m: any) => m.slug === params.slug
  )
  const prev = currentIndex > 0 ? allMissions[currentIndex - 1] : null
  const next =
    currentIndex < allMissions.length - 1
      ? allMissions[currentIndex + 1]
      : null

  return (
    // Dark page wrapper
    <div className="bg-[var(--dark)] min-h-screen">
      {/* 1. Hero — title, service tags, hero image */}
      <MissionBriefHero mission={mission} />

      {/* 2. Telemetry bar — metadata row */}
      <TelemetryBar telemetry={mission.telemetry} />

      {/* 3. Story statement 1 + first image block */}
      {mission.storyStatement1 && (
        <StoryStatement
          text={mission.storyStatement1}
          highlight={mission.storyStatement1Highlight}
        />
      )}
      {mission.imageBlock1?.length > 0 && (
        <ImageBlock images={mission.imageBlock1} />
      )}

      {/* 4. Wide cinematic image */}
      {mission.wideImage1 && (
        <WideImageStrip image={mission.wideImage1} />
      )}

      {/* 5. Story statement 2 + approach text */}
      {mission.storyStatement2 && (
        <StoryStatement
          text={mission.storyStatement2}
          highlight={mission.storyStatement2Highlight}
        />
      )}
      {mission.approachRich && (
        <ApproachText content={mission.approachRich} />
      )}

      {/* 6. Second image block */}
      {mission.imageBlock2?.length > 0 && (
        <ImageBlock images={mission.imageBlock2} />
      )}

      {/* 7. Second wide image */}
      {mission.wideImage2 && (
        <WideImageStrip image={mission.wideImage2} />
      )}

      {/* 8. Story statement 3 + outcomes */}
      {mission.storyStatement3 && (
        <StoryStatement
          text={mission.storyStatement3}
          highlight={mission.storyStatement3Highlight}
        />
      )}
      {mission.outcomes?.length > 0 && (
        <OutcomesBlock outcomes={mission.outcomes} />
      )}

      {/* 9. Device mockups */}
      {mission.deviceMockups?.length > 0 && (
        <DeviceMockups images={mission.deviceMockups} />
      )}

      {/* 10. Technical spec (conditional) */}
      {mission.technicalSpec?.length > 0 && (
        <TechnicalSpec spec={mission.technicalSpec} />
      )}

      {/* 11. Prev / Next navigation */}
      <NextMissionNav prev={prev} next={next} />
    </div>
  )
}
```

---

## DETAIL PAGE COMPONENTS

All components below are dark by default — they sit inside the dark wrapper.
Use `#F5F1E8` (warm white) for text, not pure white.

---

### `components/work-detail/MissionBriefHero.tsx`

Top of the page. Service tag pills + massive title + tagline + hero image.
Navbar sits above this — page starts below the fixed navbar.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export default function MissionBriefHero({ mission }: { mission: any }) {
  return (
    <section className="pt-32 lg:pt-40 pb-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Service tag pills */}
        {mission.services?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {mission.services.map((s: string) => (
              <span
                key={s}
                className="font-mono text-xs uppercase tracking-wider border border-white/20 text-white/60 rounded-full px-4 py-1.5"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Mission codename */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            {mission.missionCodename}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.93] tracking-[-0.03em] text-[#F5F1E8] max-w-5xl">
          {mission.title}
        </h1>

        {/* Tagline */}
        {mission.tagline && (
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-[rgba(245,241,232,0.5)] mt-6 max-w-3xl leading-snug">
            {mission.tagline}
          </p>
        )}
      </div>

      {/* Hero image — full width, tall aspect ratio */}
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
          {/* Subtle gradient at bottom blending into dark bg */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
        </div>
      )}
    </section>
  )
}
```

---

### `components/work-detail/TelemetryBar.tsx`

Mono metadata row. Sits just below the hero image.

```tsx
type TelemetryItem = { label: string; value: string }

export default function TelemetryBar({
  telemetry,
}: {
  telemetry?: TelemetryItem[]
}) {
  if (!telemetry?.length) return null

  return (
    <section className="py-10 border-y border-white/8 mt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {telemetry.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[rgba(245,241,232,0.4)] mb-1">
                /{item.label}
              </div>
              <div className="font-body text-[#F5F1E8] text-sm leading-snug">
                {item.value}
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

### `components/work-detail/StoryStatement.tsx`

The big editorial headline that SOHub uses between image blocks.
Massive display text. One word gets the dim highlight treatment.
Renders the highlighted word by finding and replacing it in the string.

```tsx
type StoryStatementProps = {
  text: string
  highlight?: string
}

export default function StoryStatement({
  text,
  highlight,
}: StoryStatementProps) {
  if (!text) return null

  // Replace the highlight word with a styled span
  const renderText = () => {
    if (!highlight) return text
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-[rgba(245,241,232,0.4)]">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.03em] text-[#F5F1E8] max-w-5xl">
          {renderText()}
        </h2>
      </div>
    </section>
  )
}
```

---

### `components/work-detail/ImageBlock.tsx`

Asymmetric grid of 2–4 images. Inspired by SOHub's brand asset grids.
Mixes a large image with smaller ones in a masonry-like layout.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export default function ImageBlock({ images }: { images: any[] }) {
  if (!images?.length) return null

  // Layout variations based on image count
  if (images.length === 1) {
    return (
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(images[0]).width(2000).url()}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    )
  }

  if (images.length === 2) {
    return (
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src={urlFor(img).width(1200).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (images.length === 3) {
    return (
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-4">
            {/* First image takes full left column */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5">
              <Image
                src={urlFor(images[0]).width(1200).url()}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            {/* Two smaller on the right */}
            <div className="flex flex-col gap-4">
              {images.slice(1).map((img, i) => (
                <div key={i} className="relative flex-1 rounded-2xl overflow-hidden bg-white/5 min-h-[200px]">
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt=""
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 4 images — 2x2 grid
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
              <Image
                src={urlFor(img).width(1200).url()}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### `components/work-detail/WideImageStrip.tsx`

Full-bleed cinematic image. Edge to edge. No padding on sides.
Used for dramatic landscape shots.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export default function WideImageStrip({ image }: { image: any }) {
  if (!image) return null

  return (
    <section className="py-8">
      <div className="relative aspect-[21/9] overflow-hidden">
        <Image
          src={urlFor(image).width(2400).url()}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Top and bottom fade into dark bg */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B0B0D] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>
    </section>
  )
}
```

---

### `components/work-detail/ApproachText.tsx`

Body copy section. Portable text. Sits after a StoryStatement.

```tsx
import { PortableText } from '@portabletext/react'

const portableComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-body text-base md:text-lg text-[rgba(245,241,232,0.7)] leading-relaxed mb-4">
        {children}
      </p>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display font-bold text-2xl text-[#F5F1E8] mt-8 mb-3">
        {children}
      </h3>
    ),
  },
}

export default function ApproachText({ content }: { content: any }) {
  if (!content) return null

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <PortableText value={content} components={portableComponents} />
        </div>
      </div>
    </section>
  )
}
```

Ensure `@portabletext/react` is installed:
```bash
npm install @portabletext/react
```

---

### `components/work-detail/OutcomesBlock.tsx`

Big numbers. Four stat blocks in a row.

```tsx
type Outcome = { number: string; label: string }

export default function OutcomesBlock({
  outcomes,
}: {
  outcomes: Outcome[]
}) {
  if (!outcomes?.length) return null

  return (
    <section className="py-20 lg:py-24 border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {outcomes.map((outcome, i) => (
            <div key={i}>
              <div className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-0.04em] text-[#F5F1E8]">
                {outcome.number}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[rgba(245,241,232,0.4)] mt-3 leading-relaxed">
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

### `components/work-detail/DeviceMockups.tsx`

Laptop + phone mockups. Dramatic, SOHub-style presentation.
Images are displayed large with a dark surrounding.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export default function DeviceMockups({ images }: { images: any[] }) {
  if (!images?.length) return null

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {images.length === 1 && (
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(images[0]).width(2000).url()}
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />
          </div>
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <Image
                src={urlFor(images[0]).width(1400).url()}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="relative aspect-[9/16] max-h-[600px] mx-auto w-full rounded-xl overflow-hidden">
              <Image
                src={urlFor(images[1]).width(800).url()}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {images.length >= 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {images.slice(0, 3).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={urlFor(img).width(1000).url()}
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

---

### `components/work-detail/TechnicalSpec.tsx`

Mono spec table. Shown only when spec data exists.
Dark panel within the dark page — slightly lighter bg for contrast.

```tsx
type SpecRow = { label: string; value: string }

export default function TechnicalSpec({ spec }: { spec: SpecRow[] }) {
  if (!spec?.length) return null

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="font-mono text-xs uppercase tracking-widest text-[rgba(245,241,232,0.4)] mb-8">
          / Technical Specification
        </div>

        <div className="bg-white/4 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {spec.map((row, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between py-4 border-b border-white/8"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[rgba(245,241,232,0.35)] flex-shrink-0 mr-4">
                  {row.label}
                </span>
                <span className="font-mono text-sm text-[#F5F1E8] text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### `components/work-detail/NextMissionNav.tsx`

Prev/next transition at the bottom of every detail page.
Dark panel, large text. Matches SOHub's bottom navigation.

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
    <section className="border-t border-white/8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Prev */}
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-64 flex items-end p-8"
          >
            {prev.heroImage && (
              <>
                <Image
                  src={urlFor(prev.heroImage).width(800).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={14} className="text-white/50" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                  Previous
                </span>
              </div>
              <div className="font-display font-bold text-2xl text-white leading-tight">
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-64 flex items-end p-8 md:border-l border-white/8"
          >
            {next.heroImage && (
              <>
                <Image
                  src={urlFor(next.heroImage).width(800).url()}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </>
            )}
            <div className="relative z-10 md:text-right md:ml-auto">
              <div className="flex items-center gap-2 mb-2 md:justify-end">
                <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                  Next
                </span>
                <ArrowRight size={14} className="text-white/50" />
              </div>
              <div className="font-display font-bold text-2xl text-white leading-tight">
                {next.title}
              </div>
            </div>
          </Link>
        ) : (
          /* If no next — link back to all work */
          <Link
            href="/work"
            className="group flex items-center justify-center h-64 border-l border-white/8 hover:bg-white/3 transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
              View all work →
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
```

---

## NAVBAR — DARK MODE HANDLING

The Navbar is currently fixed and always shows the light canvas style.
On dark detail pages it needs to switch to light text.

In `components/layout/Navbar.tsx`, detect the dark page by checking
if the page has `data-theme="dark"` on the nearest parent, or by
accepting a prop, or simplest: use the pathname.

**Simplest approach — pathname detection:**

```tsx
'use client'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  // Detail pages are dark — work index and other pages are light
  const isDark = pathname.startsWith('/work/') && pathname !== '/work'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 pt-6 ${
      isDark ? 'text-[#F5F1E8]' : 'text-[var(--ink)]'
    }`}>
      {/* wordmark */}
      <Link
        href="/"
        className={`font-display text-xl font-bold tracking-tight ${
          isDark ? 'text-[#F5F1E8]' : 'text-[var(--ink)]'
        }`}
      >
        tunedup
      </Link>

      {/* pills — adjust border and text colors for dark mode */}
      <Pill
        variant={isDark ? 'outline-dark' : 'outline'}
        href="/contact"
      >
        Get in Touch
      </Pill>
      ...
    </header>
  )
}
```

Add an `outline-dark` variant to `Pill.tsx`:
```tsx
'outline-dark': 'bg-transparent text-[#F5F1E8] border border-white/20 px-6 py-3 hover:border-white/50',
```

And update Menu pill for dark pages:
```tsx
'primary-dark': 'bg-[#F5F1E8] text-[var(--dark)] px-6 py-3',
```

---

## EXECUTION ORDER FOR CURSOR

```
CHECKPOINT 1 — Sanity schema + queries
  1. Add new fields to studio/schemas/caseStudy.ts
     (storyStatement1/2/3, imageBlock1/2, wideImage1/2,
      deviceMockups, services)
  2. Verify/add queries in lib/sanity/queries.ts
  Show me the updated schema and queries files. I will review.

CHECKPOINT 2 — Work index page
  3. Build WorkHero.tsx
  4. Build MissionCard.tsx
  5. Build MissionGrid.tsx
  6. Build app/work/page.tsx
  Run npm run dev → navigate to /work
  Show me a screenshot or describe what renders.

CHECKPOINT 3 — Detail page components (stateless first)
  7. Build TelemetryBar.tsx
  8. Build StoryStatement.tsx
  9. Build ImageBlock.tsx
  10. Build WideImageStrip.tsx
  11. Build ApproachText.tsx
  12. Build OutcomesBlock.tsx
  13. Build DeviceMockups.tsx
  14. Build TechnicalSpec.tsx
  15. Build NextMissionNav.tsx
  16. Build MissionBriefHero.tsx
  Show me these files. I will review before continuing.

CHECKPOINT 4 — Detail page assembly
  17. Build app/work/[slug]/page.tsx
  18. Update Navbar.tsx for dark mode detection
  19. Update Pill.tsx with outline-dark and primary-dark variants
  Navigate to an existing case study URL
  Verify: dark background, hero renders, all sections show

CHECKPOINT 5 — Test + polish
  20. Test on mobile 375px — all sections usable
  21. Test prev/next navigation — links work correctly
  22. Test filter pills on /work — filtering works
  23. Test empty states (no outcomes, no spec) — page doesn't break
  24. Verify Navbar shows light text on /work/[slug] pages
  25. Run npm run build — no TypeScript errors
```

---

## NON-NEGOTIABLE RULES

1. **Detail pages are fully dark.** `#0B0B0D` background. `#F5F1E8` text.
   Never use `var(--canvas)` or `var(--ink)` inside detail page components.

2. **All Sanity images via `urlFor()`.** Never use raw Sanity image URLs.

3. **Conditional rendering everywhere.** Every section checks if its
   data exists before rendering. An empty `outcomes` array = no
   OutcomesBlock rendered. A missing `wideImage1` = no WideImageStrip.
   The page should look complete with just hero + telemetry + one statement.

4. **No new npm packages** except `@portabletext/react` if not already installed.

5. **`'use client'` only on MissionGrid.** All other components are server
   components. MissionGrid needs client because of the filter state.

6. **Pause after each checkpoint.** Show output before continuing.

7. **TypeScript strict.** No `any` types except Sanity image objects
   (type those as `SanityImageSource` from `@sanity/image-url/lib/types/types`
   if available, otherwise `any` with a comment).

8. **Mobile first.** Every component must be usable at 375px.
   Grid layouts collapse to single column. Typography scales down gracefully.
