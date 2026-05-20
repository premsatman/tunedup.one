# TunedUp Mission Control — Cursor Build Prompt

> Paste this entire document into Cursor AI chat (Ctrl+L / Cmd+L).
> Cursor will build the complete site from scratch following these instructions.
> Read the whole document first, then start executing in the order specified at the bottom.

---

## CONTEXT — WHAT WE'RE BUILDING

I am rebuilding tunedup.one from scratch as a fresh Next.js 14 project.

**Brand:** TunedUp Digital — operating identity "TunedUp Mission Control"
**Tagline:** Fine Tuning Your Brand
**Story tagline:** You're on the mission. We're mission control.
**Audience:** Churches, NGOs, entrepreneurs, startups — globally, USD pricing
**Frequency motif:** 440Hz · Station call sign: STN-A440

**Design inspiration:** sohub.digital — editorial light canvas, oversized broken-word hero typography, single chunky 3D prop intersecting the hero word, pill-shaped buttons, mono-style section labels, minimal palette with one signature accent.

**This is a FRESH START.** Do not look at any existing TunedUp code or styles. Build clean from this spec.

---

## PROJECT INITIALIZATION

Create a new Next.js 14 project in a new folder called `tunedup-mission-control`:

```bash
npx create-next-app@latest tunedup-mission-control \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir=false \
  --import-alias="@/*"

cd tunedup-mission-control

npm install framer-motion lucide-react clsx
npm install next-sanity @sanity/image-url @sanity/client
npm install --save-dev @sanity/cli @types/node
```

---

## ENVIRONMENT VARIABLES

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="<USER WILL PASTE>"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_READ_TOKEN="<USER WILL PASTE>"
```

After creating the file, prompt me to paste my Sanity project ID and read token. Wait for confirmation before continuing.

---

## DESIGN SYSTEM — NON-NEGOTIABLE

### Color tokens

Add to `app/globals.css` as CSS variables:

```css
:root {
  --canvas: #EEF1F0;       /* warm off-white — page background */
  --ink: #0A0A0A;          /* deep near-black — primary text */
  --ink-mid: #2A2A2A;      /* secondary text */
  --ink-soft: #B8B5AE;     /* highlight word color, faded text */
  --accent: #27B7A5;       /* mission-critical teal — live indicators only */
  --accent-soft: rgba(39, 183, 165, 0.12);
  --dark: #0B0B0D;         /* footer, menu overlay */
  --dark-mid: #1A1A1E;     /* dark mode secondary */
  --line: rgba(10, 10, 10, 0.08);
}
```

The accent teal `#27B7A5` is used **only** for active indicators, live status dots, focus states, and the prop glow. Never as a background color or button fill.

### Typography

Install Google Fonts via `next/font`:

- **Display:** Space Grotesk (weights 500, 700) — hero words, headlines
- **Body:** DM Sans (weights 400, 500) — paragraph text
- **Mono:** JetBrains Mono (weight 400, 500) — telemetry labels, mission codes, technical spec

In `app/layout.tsx`:

```tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

Apply to body className: `${display.variable} ${body.variable} ${mono.variable}`.

Tailwind config — add font families:

```js
// tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
}
```

Default body font is `font-body`. Headlines use `font-display`. Telemetry/spec rows use `font-mono`.

### Hero word sizing

Hero broken-word treatment must be **massive**. Target sizes:

- Mobile (≤640px): `clamp(80px, 22vw, 140px)`
- Tablet (641–1024px): `clamp(140px, 18vw, 220px)`
- Desktop (≥1025px): `clamp(220px, 16vw, 320px)`

Set `font-weight: 700`, `letter-spacing: -0.04em`, `line-height: 0.9`.

### Pill button system

Three variants, used everywhere:

1. **Primary pill** — solid dark, white text, rounded-full, padding `px-6 py-3`, font-mono uppercase tracking-wide text-sm
2. **Outline pill** — white bg, 1px solid `var(--line)`, ink text, same padding and font
3. **Footer pill** — same as outline but with an arrow icon (→) on the right, used for nav links in footer

Hover state: subtle scale `1.02`, transition `200ms ease`.

### Section spacing

- Desktop section padding: `py-24` to `py-32`
- Container max-width: `max-w-7xl mx-auto px-6 lg:px-12`
- Sections never touch — always at least `py-16` between content blocks

---

## VOCABULARY — THE MISSION CONTROL LANGUAGE

Every page must use this vocabulary consistently. Never revert to generic agency language.

| Don't say | Say instead |
|---|---|
| Services | Capabilities |
| Case studies | Mission Archive |
| Clients | Crew |
| Team | Operators |
| About us | The Station |
| Contact us | Open Channel |
| Get a quote | Request a transmission |
| Free audit | Free Signal Check |
| Process | Flight Plan |
| Testimonials | Field Reports |
| Blog | Field Transmissions |
| Pricing | Mission Packages |
| Get started | Board the Station |
| Book a call | Sync with Mission Control |
| Industries | Mission Types |
| Churches | Ministry Missions |
| NGOs | Impact Missions |
| Entrepreneurs | Solo Missions |
| Startups | Launch Missions |

**Voice rule:** Speak like mission control speaks to an astronaut. Calm, precise, warm, professional. Never hyped. Never salesy.

---

## ASSET PLACEMENT — PROP IMAGES

I have generated 5 prop images already. Cursor: create the folder `public/props/` and tell me to place these files there with these exact names:

- `prop-home.png` — main transmitter/module (home hero)
- `prop-studio.png` — helmet (studio hero)
- `prop-work.png` — sample container (work hero)
- `prop-contact.png` — comms handset (contact hero)
- `prop-footer.png` — operator chair (footer, sitewide)

All five are PNG with transparent backgrounds.

---

## SITE ARCHITECTURE

```
app/
├── layout.tsx                          # Sitewide layout, fonts, Navbar, Footer
├── page.tsx                            # Home — Station Approach
├── studio/
│   └── page.tsx                        # The Station (about + crew + capabilities)
├── work/
│   ├── page.tsx                        # Mission Archive (grid + list view)
│   └── [slug]/
│       └── page.tsx                    # Individual Mission Brief (detail)
├── contact/
│   └── page.tsx                        # Open Channel
├── globals.css
└── studio/
    └── [[...tool]]/
        └── page.tsx                    # Embedded Sanity Studio (separate route group)
```

Note: the Sanity Studio route at `/studio/[[...tool]]` will conflict with the page route `/studio`. To resolve: put Sanity Studio at `/admin/[[...tool]]` instead. The agency Studio page lives at `/studio`.

Updated:

```
app/
├── studio/page.tsx                     # Public-facing The Station page
└── admin/[[...tool]]/page.tsx          # Embedded Sanity Studio
```

---

## COMPONENT STRUCTURE

```
components/
├── layout/
│   ├── Navbar.tsx                      # Sticky, top of every page
│   ├── MenuOverlay.tsx                 # Full-screen menu when hamburger clicked
│   └── Footer.tsx                      # Operator chair + giant tunedup wordmark
├── shared/
│   ├── BrokenWordHero.tsx              # The hero pattern, used on every page
│   ├── MonoLabel.tsx                   # "/Work", "/Studio", small mono section labels
│   ├── HighlightWord.tsx               # Wraps a word in mid-gray ink-soft color
│   ├── Pill.tsx                        # Variants: primary, outline, footer
│   ├── PropImage.tsx                   # Wrapper for prop PNGs with positioning
│   ├── ScrollCue.tsx                   # Small "Scroll" indicator with line
│   └── ContainerSection.tsx            # Standard section wrapper
├── home/
│   ├── HomeHero.tsx
│   ├── MissionArchivePreview.tsx
│   ├── CapabilitiesStack.tsx
│   ├── OpenChannelCTA.tsx
│   └── HomeTrustStrip.tsx
├── studio/
│   ├── StudioHero.tsx
│   ├── CrewSection.tsx
│   ├── CapabilitiesFull.tsx
│   ├── FieldReports.tsx
│   └── RecognitionList.tsx
├── work/
│   ├── WorkHero.tsx
│   ├── MissionGrid.tsx
│   ├── MissionCard.tsx
│   └── ViewToggle.tsx
├── work-detail/
│   ├── MissionBriefHero.tsx
│   ├── TelemetryBar.tsx
│   ├── TheBrief.tsx
│   ├── FrequencyTuned.tsx
│   ├── ApproachSection.tsx
│   ├── TechnicalSpec.tsx
│   ├── OutcomesBlock.tsx
│   ├── MissionGallery.tsx
│   └── NextMissionNav.tsx
└── contact/
    ├── ContactHero.tsx
    ├── OpenChannelForm.tsx
    └── DirectContactPills.tsx
```

---

## SANITY SCHEMA — EXTENSIONS

The existing Sanity project has `caseStudy`, `service`, `teamMember`, and `trustLogo` schemas. Extend `caseStudy` with these new fields. Cursor: create `studio/schemas/caseStudy.ts` with the full schema below.

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Mission Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionCodename',
      title: 'Mission Codename',
      type: 'string',
      description: 'e.g. SONG-BOOM-01, MEDIC-14Y',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionType',
      title: 'Mission Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ministry Mission', value: 'ministry' },
          { title: 'Impact Mission', value: 'impact' },
          { title: 'Solo Mission', value: 'solo' },
          { title: 'Launch Mission', value: 'launch' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'One-line tagline',
      type: 'string',
      description: 'Short evocative sentence under the mission name',
    }),
    defineField({
      name: 'frequencyTuned',
      title: 'Frequency tuned to',
      type: 'string',
      description: 'The single note we tuned this mission to. e.g. "Reach without dependency on connectivity."',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'missionPatch',
      title: 'Mission Patch',
      type: 'image',
      description: 'Small circular badge for this mission',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Complete', value: 'complete' },
          { title: 'Active', value: 'active' },
          { title: 'In Tuning', value: 'tuning' },
        ],
      },
      initialValue: 'complete',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'telemetry',
      title: 'Telemetry (metadata row)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
      description: 'e.g. Client / Year / Sector / Role / Status — pairs shown in mono row',
    }),
    defineField({
      name: 'briefRich',
      title: 'The Brief',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approachRich',
      title: 'Approach',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approachGallery',
      title: 'Approach Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'technicalSpec',
      title: 'Technical Specification',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Number' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Full Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'whatsNext',
      title: "What's Next",
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'missionCodename', media: 'heroImage' },
  },
})
```

After deploying, I'll fill in these new fields for each existing mission in Sanity Studio.

---

## SANITY CLIENT SETUP

Create `lib/sanity/client.ts`:

```ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

Create `lib/sanity/queries.ts`:

```ts
import { groq } from 'next-sanity'

export const featuredMissionsQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    heroImage,
    missionPatch,
    status,
  }
`

export const allMissionsQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    missionCodename,
    missionType,
    tagline,
    frequencyTuned,
    heroImage,
    missionPatch,
    status,
  }
`

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
    missionPatch,
    status,
    telemetry,
    briefRich,
    approachRich,
    approachGallery,
    technicalSpec,
    outcomes,
    gallery,
    whatsNext,
  }
`

export const adjacentMissionsQuery = groq`
  {
    "previous": *[_type == "caseStudy" && order < $currentOrder] | order(order desc)[0] {
      title, "slug": slug.current, missionCodename
    },
    "next": *[_type == "caseStudy" && order > $currentOrder] | order(order asc)[0] {
      title, "slug": slug.current, missionCodename
    }
  }
`

export const allTeamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo, tags
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, name, description, icon, pricing
  }
`

export const trustLogosQuery = groq`
  *[_type == "trustLogo"] | order(order asc) {
    _id, name, logo, link
  }
`
```

---

## SHARED COMPONENTS — BUILD THESE FIRST

### `components/shared/MonoLabel.tsx`

Small uppercase mono label used to introduce sections.

```tsx
export default function MonoLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] ${className}`}>
      {children}
    </span>
  )
}
```

### `components/shared/HighlightWord.tsx`

Wraps a single word in `var(--ink-soft)` for the SOHub-style highlight reading rhythm.

```tsx
export default function HighlightWord({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--ink-soft)]">{children}</span>
}
```

### `components/shared/Pill.tsx`

Three variants. Optional arrow icon. Optional href makes it a link.

```tsx
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'

type PillProps = {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'footer'
  href?: string
  arrow?: boolean
  onClick?: () => void
  className?: string
}

export default function Pill({
  children,
  variant = 'primary',
  href,
  arrow = false,
  onClick,
  className = '',
}: PillProps) {
  const base = 'inline-flex items-center gap-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02]'

  const variants = {
    primary: 'bg-[var(--ink)] text-[var(--canvas)] px-6 py-3',
    outline: 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] px-6 py-3',
    footer: 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] px-5 py-2.5',
  }

  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight size={14} />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={clsx(base, variants[variant], className)}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={clsx(base, variants[variant], className)}>
      {content}
    </button>
  )
}
```

### `components/shared/PropImage.tsx`

Wraps the prop PNGs with consistent sizing and positioning.

```tsx
import Image from 'next/image'

type PropImageProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function PropImage({ src, alt, className = '', priority = false }: PropImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 80vw, 50vw"
        className="object-contain"
      />
    </div>
  )
}
```

### `components/shared/BrokenWordHero.tsx`

The signature pattern. A massive display word with a prop image overlapping it.

```tsx
'use client'
import { motion } from 'framer-motion'
import PropImage from './PropImage'
import HighlightWord from './HighlightWord'
import ScrollCue from './ScrollCue'

type BrokenWordHeroProps = {
  word: string                            // "tunedup", "studio", "work", "contact"
  propSrc: string                         // path to prop PNG
  propAlt: string
  subline: React.ReactNode                // can include <HighlightWord>
  propPosition?: 'center' | 'right' | 'left'
  showScrollCue?: boolean
}

export default function BrokenWordHero({
  word,
  propSrc,
  propAlt,
  subline,
  propPosition = 'center',
  showScrollCue = true,
}: BrokenWordHeroProps) {
  const propPositionClasses = {
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
    left: 'left-0',
  }

  return (
    <section className="relative min-h-[90vh] bg-[var(--canvas)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16">
        {/* Massive word */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display font-bold text-[clamp(80px,18vw,320px)] leading-[0.9] tracking-[-0.04em] text-[var(--ink)] relative z-0"
          >
            {word}
          </motion.h1>

          {/* Prop image overlapping the word */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className={`absolute top-[-10%] ${propPositionClasses[propPosition]} w-[40%] h-[120%] z-10 pointer-events-none`}
          >
            <PropImage src={propSrc} alt={propAlt} priority />
          </motion.div>
        </div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-[var(--ink)] mt-8 max-w-2xl leading-tight"
        >
          {subline}
        </motion.p>
      </div>

      {showScrollCue && <ScrollCue />}
    </section>
  )
}
```

### `components/shared/ScrollCue.tsx`

```tsx
export default function ScrollCue() {
  return (
    <div className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">Scroll</span>
      <div className="w-12 h-px bg-[var(--ink-soft)]" />
    </div>
  )
}
```

### `components/shared/ContainerSection.tsx`

```tsx
export default function ContainerSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
    </section>
  )
}
```

---

## LAYOUT COMPONENTS

### `components/layout/Navbar.tsx`

Sticky top nav. Logo wordmark on the left. Two pills on the right: "Open Channel" (outline) + "Menu" (primary).

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Pill from '@/components/shared/Pill'
import MenuOverlay from './MenuOverlay'
import { MessageCircle, Menu as MenuIcon } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 pt-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            tunedup
          </Link>

          <div className="flex items-center gap-3">
            <Pill variant="outline" href="/contact">
              <MessageCircle size={14} />
              <span className="hidden sm:inline">Open Channel</span>
            </Pill>
            <Pill variant="primary" onClick={() => setMenuOpen(true)}>
              <span>Menu</span>
              <MenuIcon size={14} />
            </Pill>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
```

### `components/layout/MenuOverlay.tsx`

Full-screen overlay menu — Home, The Station, Mission Archive, Open Channel.

```tsx
'use client'
import Link from 'next/link'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { label: 'Home', href: '/', code: '/01' },
  { label: 'The Station', href: '/studio', code: '/02' },
  { label: 'Mission Archive', href: '/work', code: '/03' },
  { label: 'Open Channel', href: '/contact', code: '/04' },
]

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-[var(--canvas)]"
        >
          <div className="absolute top-6 right-6 lg:top-6 lg:right-12">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--canvas)] rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider"
            >
              <span>Close</span>
              <X size={14} />
            </button>
          </div>

          <div className="h-full flex items-center px-6 lg:px-12">
            <nav className="w-full">
              <ul className="space-y-6">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold hover:text-[var(--ink-soft)] transition-colors"
                    >
                      <span className="font-mono text-sm text-[var(--ink-soft)]">{item.code}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### `components/layout/Footer.tsx`

Dark footer (`var(--dark)`). Operator chair prop floating inside a giant `tunedup` wordmark. Socials + nav pills.

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[var(--canvas)] relative overflow-hidden">
      <div className="relative pt-32 pb-12">
        {/* Giant wordmark */}
        <div className="relative max-w-[1600px] mx-auto px-6">
          <div className="relative">
            <h2 className="font-display font-bold text-[clamp(120px,22vw,400px)] leading-[0.85] tracking-[-0.04em] text-center text-[var(--canvas)]">
              tunedup
            </h2>
            {/* Operator chair prop overlapping the wordmark */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50%] h-[80%] pointer-events-none">
              <Image
                src="/props/prop-footer.png"
                alt="TunedUp Mission Control — Operator Chair"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Caption */}
          <p className="text-center font-display text-2xl md:text-3xl mt-8 -mt-20 relative z-10">
            <span className="text-[var(--ink-soft)]">©</span> TunedUp Digital
            <br />
            <span className="font-mono text-sm uppercase tracking-widest mt-4 inline-block text-[var(--ink-soft)]">
              Mission Control · STN-A440 · Fine Tuning Since 2024
            </span>
          </p>

          {/* Socials */}
          <div className="flex justify-center gap-3 mt-12">
            {[
              { icon: Linkedin, href: 'https://linkedin.com/company/tunedup' },
              { icon: Twitter, href: 'https://twitter.com/tunedup' },
              { icon: Instagram, href: 'https://instagram.com/tunedup' },
              { icon: Youtube, href: 'https://youtube.com/@tunedup' },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--canvas)] text-[var(--ink)] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Nav pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {[
              { label: 'Home', href: '/' },
              { label: 'Studio', href: '/studio' },
              { label: 'Work', href: '/work' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 bg-[var(--canvas)] text-[var(--ink)] rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:scale-105 transition-transform"
              >
                {label} →
              </Link>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[var(--ink-mid)] text-[var(--canvas)] rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Go Up <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

(The "Go Up" button is a client component — add `'use client'` at top of `Footer.tsx` and the `onClick` works. Or extract that button into its own client component to keep Footer as a Server Component. Use whichever is cleaner.)

---

## HOMEPAGE — `app/page.tsx`

The full home page composition.

```tsx
import { client } from '@/lib/sanity/client'
import { featuredMissionsQuery, allServicesQuery, trustLogosQuery } from '@/lib/sanity/queries'
import HomeHero from '@/components/home/HomeHero'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import MissionArchivePreview from '@/components/home/MissionArchivePreview'
import CapabilitiesStack from '@/components/home/CapabilitiesStack'
import OpenChannelCTA from '@/components/home/OpenChannelCTA'

export const revalidate = 60

export default async function Home() {
  const [missions, services, trustLogos] = await Promise.all([
    client.fetch(featuredMissionsQuery),
    client.fetch(allServicesQuery),
    client.fetch(trustLogosQuery),
  ])

  return (
    <>
      <HomeHero />
      <HomeTrustStrip logos={trustLogos} />
      <MissionArchivePreview missions={missions} />
      <CapabilitiesStack services={services} />
      <OpenChannelCTA />
    </>
  )
}
```

### `components/home/HomeHero.tsx`

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function HomeHero() {
  return (
    <BrokenWordHero
      word="tunedup"
      propSrc="/props/prop-home.png"
      propAlt="TunedUp Mission Transmitter — STN-A440"
      subline={
        <>
          Every mission has a <HighlightWord>frequency.</HighlightWord>
          <br />
          We help yours carry.
        </>
      }
      propPosition="center"
    />
  )
}
```

### `components/home/HomeTrustStrip.tsx`

Horizontal logo strip. "Trusted by" mono label on the left, logos scrolling right.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import MonoLabel from '@/components/shared/MonoLabel'

export default function HomeTrustStrip({ logos }: { logos: any[] }) {
  if (!logos?.length) return null

  return (
    <section className="py-16 border-y border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center gap-8">
        <MonoLabel>Trusted by crew across</MonoLabel>
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-70">
          {logos.map((logo) => (
            <div key={logo._id} className="relative h-8 w-24">
              <Image
                src={urlFor(logo.logo).width(200).url()}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `components/home/MissionArchivePreview.tsx`

"Mission Archive" preview — 2-column grid of featured missions. Each card: hero image background, dark gradient overlay at bottom, mission codename (mono small) + title (display).

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

type Mission = {
  _id: string
  title: string
  slug: string
  missionCodename: string
  tagline?: string
  heroImage?: any
  status?: string
}

export default function MissionArchivePreview({ missions }: { missions: Mission[] }) {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Mission Archive</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-4xl">
        We are a <HighlightWord>diligent</HighlightWord> crew, obsessed with turning ideas into measurable trajectory.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {missions.map((mission) => (
          <Link
            key={mission._id}
            href={`/work/${mission.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)]"
          >
            {mission.heroImage && (
              <Image
                src={urlFor(mission.heroImage).width(1200).url()}
                alt={mission.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                {mission.missionCodename}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                {mission.title}
              </h3>
              {mission.tagline && (
                <p className="font-body text-sm text-white/80 mt-2 line-clamp-2">{mission.tagline}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </ContainerSection>
  )
}
```

### `components/home/CapabilitiesStack.tsx`

Four stacked dark blocks. Each block: small label + giant two-word title + keyword list + paragraph. Direct SOHub homage but with Mission Control vocabulary.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

const capabilities = [
  {
    code: '/01',
    title1: 'Brand',
    title2: 'Systems',
    keywords: ['Logo', 'Typography', 'Voice & Tone', 'Guidelines', 'Identity'],
    body:
      'Every mission starts with a clear identity. We develop the visual and verbal systems that make your brand recognizable on every channel — the signal before the message.',
  },
  {
    code: '/02',
    title1: 'Smart',
    title2: 'Development',
    keywords: ['Web Development', 'Next.js', 'Sanity CMS', 'iOS / Android Apps', 'UI/UX'],
    body:
      'Fast, accessible, conversion-tuned websites and applications. Built on Next.js and headless CMS, designed to outlast trends and rank well from day one.',
  },
  {
    code: '/03',
    title1: 'Growth',
    title2: 'Campaigns',
    keywords: ['Google Ads', 'Ad Grants for NGOs', 'SEO', 'Email Marketing', 'Social'],
    body:
      'We pilot the campaigns that turn signal into reach. From Google Ads to nonprofit Ad Grants ($10K/mo free for eligible NGOs) to SEO and email — measurable, accountable, no fluff.',
  },
  {
    code: '/04',
    title1: 'Workflow',
    title2: 'Automation',
    keywords: ['n8n Workflows', 'AI Agents', 'Integrations', 'Custom Pipelines', 'Slack / Notion / CRM'],
    body:
      'We automate the tasks that drain your team — visitor follow-up, lead routing, invoice reminders, content distribution. So your crew can focus on the actual mission.',
  },
]

export default function CapabilitiesStack({ services }: { services: any[] }) {
  return (
    <ContainerSection className="bg-[var(--canvas)]">
      <MonoLabel className="block mb-4">/ Capabilities</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-4xl">
        We are an unusual <HighlightWord>mission control,</HighlightWord> focusing on transforming your vision into a measurable digital presence.
      </h2>

      <div className="space-y-1 mt-16">
        {capabilities.map((cap) => (
          <div
            key={cap.code}
            className="bg-[var(--dark)] text-[var(--canvas)] rounded-3xl px-8 lg:px-12 py-12 lg:py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-1">
                <span className="font-mono text-sm text-[var(--ink-soft)]">{cap.code}</span>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em]">
                  {cap.title1}
                  <br />
                  <span className="text-[var(--ink-soft)]">{cap.title2}</span>
                </h3>
              </div>

              <div className="lg:col-span-3">
                <ul className="space-y-2 font-mono text-sm">
                  {cap.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2">
                <p className="font-body text-sm text-[var(--ink-soft)] leading-relaxed">{cap.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

### `components/home/OpenChannelCTA.tsx`

The "Don't be shy" equivalent. Giant text + pills.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import Pill from '@/components/shared/Pill'

export default function OpenChannelCTA() {
  return (
    <ContainerSection className="text-center">
      <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.04em]">
        Let's
        <br />
        tune in.
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <Pill variant="primary" href="/contact">
          Open Channel
        </Pill>
        <Pill variant="outline" href="/contact">
          Sync with Mission Control
        </Pill>
      </div>
    </ContainerSection>
  )
}
```

---

## STUDIO PAGE — `app/studio/page.tsx`

"The Station" — about, crew (team), capabilities full list, recognition, careers.

```tsx
import { client } from '@/lib/sanity/client'
import { allTeamQuery, allServicesQuery } from '@/lib/sanity/queries'
import StudioHero from '@/components/studio/StudioHero'
import CrewSection from '@/components/studio/CrewSection'
import CapabilitiesFull from '@/components/studio/CapabilitiesFull'
import RecognitionList from '@/components/studio/RecognitionList'

export const revalidate = 60

export default async function StudioPage() {
  const [team, services] = await Promise.all([
    client.fetch(allTeamQuery),
    client.fetch(allServicesQuery),
  ])

  return (
    <>
      <StudioHero />
      <CrewSection team={team} />
      <CapabilitiesFull services={services} />
      <RecognitionList />
    </>
  )
}
```

### `components/studio/StudioHero.tsx`

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function StudioHero() {
  return (
    <BrokenWordHero
      word="studio"
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

### `components/studio/CrewSection.tsx`

Team grid pulling from Sanity.

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

type Member = {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: any
  tags?: string[]
}

export default function CrewSection({ team }: { team: Member[] }) {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Crew</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-3xl">
        We are a <HighlightWord>small crew</HighlightWord> obsessed with making missions sound the way founders hear them in their head.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {team?.map((member) => (
          <div
            key={member._id}
            className="bg-[var(--canvas)] border border-[var(--line)] rounded-2xl p-6"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-[var(--ink-soft)]">
              {member.photo ? (
                <Image
                  src={urlFor(member.photo).width(600).url()}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-6xl text-[var(--canvas)]">
                  {member.name?.[0]}
                </div>
              )}
            </div>

            <h3 className="font-display font-bold text-2xl">{member.name}</h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-1">
              {member.role}
            </p>
            {member.bio && (
              <p className="font-body text-sm text-[var(--ink-mid)] mt-4 line-clamp-3">{member.bio}</p>
            )}

            {member.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {member.tags.map((tag) => (
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
        ))}
      </div>
    </ContainerSection>
  )
}
```

### `components/studio/CapabilitiesFull.tsx`

Full services list — each as a colored floating pill cluster (SOHub Studio page move).

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

const pills = [
  { label: 'Websites', color: 'bg-pink-400 text-pink-950' },
  { label: 'Branding', color: 'bg-yellow-400 text-yellow-950' },
  { label: 'Ads', color: 'bg-orange-400 text-orange-950' },
  { label: 'Apps', color: 'bg-cyan-400 text-cyan-950' },
  { label: 'Automation', color: 'bg-lime-400 text-lime-950' },
  { label: 'Strategy', color: 'bg-white text-black border border-[var(--line)]' },
]

export default function CapabilitiesFull({ services }: { services: any[] }) {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Capabilities</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-3xl">
        Websites, branding, ads, apps, automation, & strategy.
      </h2>

      <div className="bg-[var(--dark)] rounded-3xl mt-16 p-12 lg:p-16 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`${pill.color} font-display font-bold text-2xl md:text-3xl rounded-full px-8 py-4`}
            >
              {pill.label}
            </span>
          ))}

          <a
            href="/contact"
            className="bg-[var(--ink)] text-[var(--canvas)] font-mono text-sm uppercase tracking-wider rounded-full px-8 py-4 flex items-center gap-2"
          >
            Open Channel →
          </a>
        </div>
      </div>
    </ContainerSection>
  )
}
```

### `components/studio/RecognitionList.tsx`

Stacked recognition rows like SOHub's Adobe Behance list.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

const items = [
  { left: 'Sharon Church · Odia Lutheran Community', right: 'Song Boom · 10K Downloads' },
  { left: 'Healthcare Group · Hyderabad', right: '14 Years · Patient Acquisition' },
  { left: 'PS.Today · Multilingual Devotional', right: '365-Day · 3 Languages' },
  { left: 'Transformation Night', right: 'Event Campaign · Live' },
]

export default function RecognitionList() {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Recognition</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-4xl">
        From churches to clinics to coffee startups — we tune what <HighlightWord>matters.</HighlightWord>
      </h2>

      <div className="mt-16 border-t border-[var(--line)]">
        {items.map((item) => (
          <div
            key={item.left}
            className="flex items-center justify-between py-6 border-b border-[var(--line)] hover:bg-[var(--accent-soft)] transition-colors px-2 -mx-2 rounded"
          >
            <span className="font-display font-bold text-xl md:text-2xl">{item.left}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] text-right">
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

## WORK INDEX PAGE — `app/work/page.tsx`

Mission Archive — full grid of all missions with filter by mission type.

```tsx
import { client } from '@/lib/sanity/client'
import { allMissionsQuery } from '@/lib/sanity/queries'
import WorkHero from '@/components/work/WorkHero'
import MissionGrid from '@/components/work/MissionGrid'

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

### `components/work/WorkHero.tsx`

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function WorkHero() {
  return (
    <BrokenWordHero
      word="work"
      propSrc="/props/prop-work.png"
      propAlt="TunedUp Mission Sample Container — STN-A440"
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

### `components/work/MissionGrid.tsx`

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

const filters = [
  { value: 'all', label: 'All Missions' },
  { value: 'ministry', label: 'Ministry' },
  { value: 'impact', label: 'Impact' },
  { value: 'solo', label: 'Solo' },
  { value: 'launch', label: 'Launch' },
]

export default function MissionGrid({ missions }: { missions: any[] }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? missions : missions.filter((m) => m.missionType === filter)

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Projects</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-4xl">
        Each mission we've flown carries a frequency it now broadcasts on its own. We just helped find <HighlightWord>the note.</HighlightWord>
      </h2>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-3 mt-12">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`font-mono text-xs uppercase tracking-wider rounded-full px-5 py-2.5 transition-all ${
              filter === f.value
                ? 'bg-[var(--ink)] text-[var(--canvas)]'
                : 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {filtered.map((mission) => (
          <Link
            key={mission._id}
            href={`/work/${mission.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--dark)]"
          >
            {mission.heroImage && (
              <Image
                src={urlFor(mission.heroImage).width(1200).url()}
                alt={mission.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                {mission.missionCodename}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                {mission.title}
              </h3>
              {mission.tagline && (
                <p className="font-body text-sm text-white/80 mt-2 line-clamp-2">{mission.tagline}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </ContainerSection>
  )
}
```

---

## MISSION BRIEF (DETAIL) PAGE — `app/work/[slug]/page.tsx`

This is the most important new page — full technical spec for every mission.

```tsx
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { missionBySlugQuery, allMissionsQuery, adjacentMissionsQuery } from '@/lib/sanity/queries'
import MissionBriefHero from '@/components/work-detail/MissionBriefHero'
import TelemetryBar from '@/components/work-detail/TelemetryBar'
import TheBrief from '@/components/work-detail/TheBrief'
import FrequencyTuned from '@/components/work-detail/FrequencyTuned'
import ApproachSection from '@/components/work-detail/ApproachSection'
import TechnicalSpec from '@/components/work-detail/TechnicalSpec'
import OutcomesBlock from '@/components/work-detail/OutcomesBlock'
import MissionGallery from '@/components/work-detail/MissionGallery'
import NextMissionNav from '@/components/work-detail/NextMissionNav'

export async function generateStaticParams() {
  const missions = await client.fetch(allMissionsQuery)
  return missions.map((m: any) => ({ slug: m.slug }))
}

export const revalidate = 60

export default async function MissionDetail({ params }: { params: { slug: string } }) {
  const mission = await client.fetch(missionBySlugQuery, { slug: params.slug })
  if (!mission) notFound()

  // For prev/next, we'd need the current order — simplest is to fetch all and find by index.
  // For now, just pass mission.
  return (
    <>
      <MissionBriefHero mission={mission} />
      <TelemetryBar telemetry={mission.telemetry} />
      <TheBrief brief={mission.briefRich} />
      {mission.frequencyTuned && <FrequencyTuned note={mission.frequencyTuned} />}
      <ApproachSection approach={mission.approachRich} gallery={mission.approachGallery} />
      <TechnicalSpec spec={mission.technicalSpec} />
      <OutcomesBlock outcomes={mission.outcomes} />
      <MissionGallery images={mission.gallery} />
      <NextMissionNav currentSlug={mission.slug} />
    </>
  )
}
```

### `components/work-detail/MissionBriefHero.tsx`

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import MonoLabel from '@/components/shared/MonoLabel'

export default function MissionBriefHero({ mission }: { mission: any }) {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <MonoLabel>{mission.missionCodename}</MonoLabel>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
            · {mission.status === 'complete' ? 'Complete' : mission.status === 'active' ? 'Active' : 'In Tuning'}
          </span>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.03em] max-w-5xl">
          {mission.title}
        </h1>

        {mission.tagline && (
          <p className="font-display text-2xl md:text-3xl text-[var(--ink-soft)] mt-6 max-w-3xl leading-tight">
            {mission.tagline}
          </p>
        )}

        {mission.heroImage && (
          <div className="relative aspect-[16/9] mt-16 rounded-2xl overflow-hidden bg-[var(--dark)]">
            <Image
              src={urlFor(mission.heroImage).width(2400).url()}
              alt={mission.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
```

### `components/work-detail/TelemetryBar.tsx`

The mono metadata row — Client / Year / Sector / Role / Status.

```tsx
type TelemetryItem = { label: string; value: string }

export default function TelemetryBar({ telemetry }: { telemetry?: TelemetryItem[] }) {
  if (!telemetry?.length) return null

  return (
    <section className="py-12 border-y border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {telemetry.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                /{item.label}
              </div>
              <div className="font-body text-base mt-1 leading-tight">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `components/work-detail/TheBrief.tsx`

```tsx
import { PortableText } from '@portabletext/react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function TheBrief({ brief }: { brief: any }) {
  if (!brief) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ The Brief</MonoLabel>
      <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.02em] max-w-4xl">
        <PortableText value={brief} />
      </div>
    </ContainerSection>
  )
}
```

Install `@portabletext/react`:
```bash
npm install @portabletext/react
```

### `components/work-detail/FrequencyTuned.tsx`

The "single note we tuned to" highlight block.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function FrequencyTuned({ note }: { note: string }) {
  return (
    <ContainerSection className="bg-[var(--dark)] text-[var(--canvas)]">
      <div className="max-w-4xl">
        <MonoLabel className="block mb-4 !text-[var(--accent)]">/ Frequency tuned to</MonoLabel>
        <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.02em]">
          {note}
        </p>
      </div>
    </ContainerSection>
  )
}
```

### `components/work-detail/ApproachSection.tsx`

```tsx
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function ApproachSection({ approach, gallery }: { approach: any; gallery?: any[] }) {
  if (!approach) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Approach</MonoLabel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-8">
        <div className="prose prose-lg max-w-none font-body">
          <PortableText value={approach} />
        </div>

        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--ink-soft)]">
                <Image src={urlFor(img).width(1200).url()} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </ContainerSection>
  )
}
```

### `components/work-detail/TechnicalSpec.tsx`

The mono spec sheet.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

type SpecRow = { label: string; value: string }

export default function TechnicalSpec({ spec }: { spec?: SpecRow[] }) {
  if (!spec?.length) return null

  return (
    <ContainerSection className="bg-[var(--canvas)]">
      <MonoLabel className="block mb-4">/ Technical Specification</MonoLabel>

      <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-2xl">
        Every system, every dependency, every choice — documented.
      </h2>

      <div className="bg-[var(--dark)] text-[var(--canvas)] rounded-2xl p-8 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 font-mono text-sm">
          {spec.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <span className="text-[var(--ink-soft)] uppercase tracking-wider">{row.label}</span>
              <span className="text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ContainerSection>
  )
}
```

### `components/work-detail/OutcomesBlock.tsx`

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

type Outcome = { number: string; label: string }

export default function OutcomesBlock({ outcomes }: { outcomes?: Outcome[] }) {
  if (!outcomes?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Outcomes</MonoLabel>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {outcomes.map((outcome, i) => (
          <div key={i}>
            <div className="font-display font-bold text-6xl md:text-7xl lg:text-8xl leading-none tracking-[-0.04em]">
              {outcome.number}
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] mt-3">
              {outcome.label}
            </div>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

### `components/work-detail/MissionGallery.tsx`

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'

export default function MissionGallery({ images }: { images?: any[] }) {
  if (!images?.length) return null

  return (
    <ContainerSection>
      <MonoLabel className="block mb-12">/ Selected screens</MonoLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--ink-soft)]">
            <Image src={urlFor(img).width(1200).url()} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
```

### `components/work-detail/NextMissionNav.tsx`

Simple prev/next pills at the bottom.

```tsx
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { allMissionsQuery } from '@/lib/sanity/queries'

export default async function NextMissionNav({ currentSlug }: { currentSlug: string }) {
  const missions = await client.fetch(allMissionsQuery)
  const currentIdx = missions.findIndex((m: any) => m.slug === currentSlug)
  const prev = currentIdx > 0 ? missions[currentIdx - 1] : null
  const next = currentIdx < missions.length - 1 ? missions[currentIdx + 1] : null

  return (
    <section className="py-16 border-t border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-4 justify-between">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group flex items-center gap-3 bg-[var(--canvas)] border border-[var(--line)] rounded-full px-6 py-4 hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft size={16} />
            <div className="text-left">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                Previous Mission
              </div>
              <div className="font-display font-bold text-base">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center gap-3 bg-[var(--ink)] text-[var(--canvas)] rounded-full px-6 py-4 hover:scale-[1.02] transition-transform"
          >
            <div className="text-right">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                Next Mission
              </div>
              <div className="font-display font-bold text-base">{next.title}</div>
            </div>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}
```

---

## CONTACT PAGE — `app/contact/page.tsx`

```tsx
import ContactHero from '@/components/contact/ContactHero'
import OpenChannelForm from '@/components/contact/OpenChannelForm'
import DirectContactPills from '@/components/contact/DirectContactPills'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <OpenChannelForm />
      <DirectContactPills />
    </>
  )
}
```

### `components/contact/ContactHero.tsx`

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function ContactHero() {
  return (
    <BrokenWordHero
      word="contact"
      propSrc="/props/prop-contact.png"
      propAlt="TunedUp Comms Handset — STN-A440"
      subline={
        <>
          Start a conversation about <HighlightWord>new business</HighlightWord> or media inquiries.
        </>
      }
      propPosition="right"
    />
  )
}
```

### `components/contact/OpenChannelForm.tsx`

```tsx
'use client'
import { useState } from 'react'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import HighlightWord from '@/components/shared/HighlightWord'

export default function OpenChannelForm() {
  const [intent, setIntent] = useState<'project' | 'question' | 'hi' | null>(null)

  return (
    <ContainerSection>
      <MonoLabel className="block mb-4">/ Open Channel</MonoLabel>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] max-w-4xl">
        Have an inquiry, a collaboration offer, or even <HighlightWord>trouble sleeping?</HighlightWord> Transmit when ready.
      </h2>

      <div className="bg-[var(--canvas)] border border-[var(--line)] rounded-3xl p-8 lg:p-16 mt-16">
        <h3 className="font-display text-2xl md:text-3xl text-center max-w-2xl mx-auto">
          Hey there! How can mission control assist you on this{' '}
          <span className="text-[var(--ink-soft)]">afternoon</span>?
        </h3>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { value: 'project', label: 'Start a project' },
            { value: 'question', label: 'Ask a question' },
            { value: 'hi', label: 'Say hi' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIntent(opt.value as any)}
              className={`font-mono text-xs uppercase tracking-wider rounded-full px-6 py-3 transition-all ${
                intent === opt.value
                  ? 'bg-[var(--ink)] text-[var(--canvas)]'
                  : 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] hover:scale-[1.02]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {intent && (
          <form className="mt-12 max-w-2xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-[var(--canvas)] border border-[var(--line)] rounded-2xl px-6 py-4 font-body focus:outline-none focus:border-[var(--ink)]"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-[var(--canvas)] border border-[var(--line)] rounded-2xl px-6 py-4 font-body focus:outline-none focus:border-[var(--ink)]"
              required
            />
            <textarea
              placeholder="Your transmission..."
              rows={5}
              className="w-full bg-[var(--canvas)] border border-[var(--line)] rounded-2xl px-6 py-4 font-body focus:outline-none focus:border-[var(--ink)] resize-none"
              required
            />
            <button
              type="submit"
              className="bg-[var(--ink)] text-[var(--canvas)] font-mono text-xs uppercase tracking-wider rounded-full px-8 py-4 hover:scale-[1.02] transition-transform"
            >
              Transmit →
            </button>
          </form>
        )}
      </div>
    </ContainerSection>
  )
}
```

### `components/contact/DirectContactPills.tsx`

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

export default function DirectContactPills() {
  return (
    <ContainerSection>
      <MonoLabel className="block mb-8">/ Direct frequencies</MonoLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="mailto:prem@tunedup.one"
          className="flex items-center gap-4 bg-[var(--canvas)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--ink)] transition-colors"
        >
          <Mail size={24} />
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">Email</div>
            <div className="font-body">prem@tunedup.one</div>
          </div>
        </a>

        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[var(--canvas)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--ink)] transition-colors"
        >
          <MessageCircle size={24} />
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">WhatsApp</div>
            <div className="font-body">Direct line</div>
          </div>
        </a>

        <a
          href="https://calendly.com/tunedup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[var(--ink)] text-[var(--canvas)] rounded-2xl p-6 hover:scale-[1.02] transition-transform"
        >
          <Calendar size={24} />
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">Schedule</div>
            <div className="font-body">Sync with mission control</div>
          </div>
        </a>
      </div>
    </ContainerSection>
  )
}
```

---

## ROOT LAYOUT — `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TunedUp Mission Control — Fine Tuning Your Brand',
  description:
    'You\'re on the mission. We\'re mission control. Digital strategy, web development, automation, and growth for churches, NGOs, entrepreneurs, and startups.',
  metadataBase: new URL('https://tunedup.one'),
  openGraph: {
    title: 'TunedUp Mission Control',
    description: 'Fine Tuning Your Brand',
    url: 'https://tunedup.one',
    siteName: 'TunedUp Digital',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-[var(--canvas)] text-[var(--ink)] antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

---

## SANITY STUDIO EMBED

Create `sanity.config.ts` in the project root:

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './studio/schemas'

export default defineConfig({
  name: 'tunedup-mission-control',
  title: 'TunedUp Mission Control CMS',
  basePath: '/admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

Create `studio/schemas/index.ts`:

```ts
import caseStudy from './caseStudy'
import teamMember from './teamMember'
import service from './service'
import trustLogo from './trustLogo'

export const schemaTypes = [caseStudy, teamMember, service, trustLogo]
```

Create the other schemas (`teamMember.ts`, `service.ts`, `trustLogo.ts`) matching the existing Sanity schema structure from the old project. If unsure, fetch the schemas from the existing project's `/studio` folder or ask me.

Create `app/admin/[[...tool]]/page.tsx`:

```tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

---

## EXECUTION ORDER FOR CURSOR

Build in this exact order. Pause and confirm with me after each major checkpoint.

```
CHECKPOINT 1 — Setup (do this first)
  1. Run create-next-app and install dependencies
  2. Create .env.local — ASK ME for project ID and read token
  3. Create app/globals.css with color tokens
  4. Update tailwind.config.ts with font families
  5. Create folder structure: components/{layout,shared,home,studio,work,work-detail,contact} and public/props
  6. PROMPT ME: "Drop your 5 prop PNGs into public/props/ with names: prop-home.png, prop-studio.png, prop-work.png, prop-contact.png, prop-footer.png. Reply OK when done."

CHECKPOINT 2 — Shared components
  7. Build components/shared/MonoLabel.tsx
  8. Build components/shared/HighlightWord.tsx
  9. Build components/shared/Pill.tsx
  10. Build components/shared/PropImage.tsx
  11. Build components/shared/ScrollCue.tsx
  12. Build components/shared/ContainerSection.tsx
  13. Build components/shared/BrokenWordHero.tsx

CHECKPOINT 3 — Sanity + Layout
  14. Build lib/sanity/client.ts and lib/sanity/queries.ts
  15. Build studio/schemas/caseStudy.ts (extended)
  16. Build sanity.config.ts
  17. Build app/admin/[[...tool]]/page.tsx
  18. Build components/layout/Navbar.tsx, MenuOverlay.tsx, Footer.tsx
  19. Build app/layout.tsx
  20. Run `npm run dev` and verify the empty site loads with nav and footer visible

CHECKPOINT 4 — Homepage
  21. Build all components/home/* components
  22. Build app/page.tsx
  23. Verify homepage renders with broken-word hero, prop image, all sections

CHECKPOINT 5 — Studio page
  24. Build all components/studio/* components
  25. Build app/studio/page.tsx
  26. Verify

CHECKPOINT 6 — Work index + detail
  27. Build all components/work/* and components/work-detail/* components
  28. Build app/work/page.tsx and app/work/[slug]/page.tsx
  29. Install @portabletext/react
  30. Verify both pages render

CHECKPOINT 7 — Contact page
  31. Build all components/contact/* components
  32. Build app/contact/page.tsx
  33. Verify

CHECKPOINT 8 — Final
  34. Run a full visual audit on mobile (375px), tablet (768px), desktop (1280px)
  35. Check all broken-word heroes have prop overlapping correctly
  36. Check Footer prop is positioned correctly inside giant wordmark
  37. Run `npm run build` to confirm no TypeScript errors
  38. Deploy preview to Vercel
```

---

## RULES OF EXECUTION

1. **Never deviate from the Mission Control vocabulary.** Don't say "case studies" — say "Mission Archive." Don't say "services" — say "Capabilities." If unsure, ask me.

2. **Never use green.** This project has zero green. Canvas + ink + accent teal only.

3. **The accent teal `#27B7A5` is rare.** It only appears on: status dots, the FrequencyTuned dark block label, focus rings, prop glow. Never as a background fill or button color.

4. **Typography hierarchy is sacred.** Hero words are `font-display` at clamp() massive sizes. Section labels are `font-mono` small uppercase. Body is `font-body`. Spec rows are `font-mono`. Never mix.

5. **Pause and ask after each checkpoint.** Don't barrel through. Show me one section, get confirmation, move on.

6. **Mobile-first.** Every component must look correct at 375px before scaling up.

7. **TypeScript strict.** No `any` types except where Sanity returns untyped data — even then, define narrow types like `{ _id: string; title: string }` where possible.

8. **No lorem ipsum.** If a section needs content I haven't provided, ask me for it. Don't invent.

9. **Comment placeholder values with `// TODO:`** so I can find them later. e.g. WhatsApp number, Calendly link, social URLs.

10. **Server components by default.** Add `'use client'` only where required (anything with `useState`, `motion.div`, event handlers).

---

## FIRST MESSAGE BACK TO ME

After you read this entire document, respond with:

1. "I've read the full spec. Starting Checkpoint 1."
2. List any clarifications you need before starting.
3. Then run the create-next-app command and prompt me for env variables.

Do not start building before sending this confirmation.
