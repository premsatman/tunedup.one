# TunedUp — Contact Page Wizard
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> Build only what is listed here. No backend wiring — Resend and n8n will be added separately.
> Follow the existing design system exactly. No new dependencies unless listed.

---

## CONTEXT

We are adding the `/contact` page to the existing TunedUp Next.js 14 project.

The page has three sections:
1. `ContactHero` — broken-word hero with handset prop (existing `BrokenWordHero` pattern)
2. `ContactWizard` — the interactive two-branch wizard (main feature of this prompt)
3. `DirectContactPills` — email + WhatsApp direct links

The wizard has **three pills in the greeting panel:**
- **Start a Project** → 4-step qualification wizard → contact form → submit
- **Join Us** → 2-step application wizard → form → submit
- **Book a Call** → greyed out, "Coming Soon" tag, not clickable

On submit, both branches POST to `/api/contact` (a placeholder that logs to console — no real email yet).

---

## DESIGN SYSTEM RULES — READ BEFORE WRITING ANY CODE

Use **only** these tokens. Never hardcode colors or fonts.

```css
--canvas: #EEF1F0      /* page background, panel background */
--ink: #0A0A0A         /* primary text, dark pills */
--ink-mid: #2A2A2A     /* secondary text */
--ink-soft: #B8B5AE    /* labels, faded text, Coming Soon text */
--accent: #27B7A5      /* selected pill border/bg tint, focus rings */
--accent-soft: rgba(39, 183, 165, 0.12) /* selected pill background */
--dark: #0B0B0D        /* dark panels */
--line: rgba(10,10,10,0.08) /* borders */
```

**Fonts:**
- `font-display` (Space Grotesk 700) — all headlines
- `font-body` (DM Sans 400/500) — form fields, body text
- `font-mono` (JetBrains Mono 400/500) — section labels, step counters, pill text, tags

**Pill system** — use the existing `Pill` component where possible. For wizard-specific selectable pills (toggle/radio behavior), build `WizardPill` locally in the wizard file.

**Motion** — use existing Framer Motion setup. `AnimatePresence` + `motion.div` for step transitions. Always gate with `useReducedMotion`.

---

## FILE STRUCTURE TO CREATE

```
app/
└── contact/
    └── page.tsx                          ← page composition

components/
└── contact/
    ├── ContactHero.tsx                   ← hero section
    ├── ContactWizard.tsx                 ← main wizard (client component)
    ├── DirectContactPills.tsx            ← email + WhatsApp
    ├── wizard/
    │   ├── WizardPill.tsx                ← selectable pill (toggle/radio)
    │   ├── WizardInput.tsx               ← styled text input
    │   ├── WizardTextarea.tsx            ← styled textarea
    │   ├── WizardNavigation.tsx          ← Go Back + Continue/Submit pills
    │   ├── WizardConfirmation.tsx        ← post-submit screen
    │   ├── ProjectBranch.tsx             ← all 4 steps for "Start a Project"
    │   └── JoinBranch.tsx                ← all 2 steps for "Join Us"

app/
└── api/
    └── contact/
        └── route.ts                      ← placeholder POST handler
```

---

## 1. `app/contact/page.tsx`

Server component. No data fetching needed.

```tsx
import { Metadata } from 'next'
import ContactHero from '@/components/contact/ContactHero'
import ContactWizard from '@/components/contact/ContactWizard'
import DirectContactPills from '@/components/contact/DirectContactPills'

export const metadata: Metadata = {
  title: 'Get in Touch — TunedUp Workshop',
  description:
    'Start a project, join the workshop, or book a free call. We reply within one business day.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactWizard />
      <DirectContactPills />
    </>
  )
}
```

---

## 2. `components/contact/ContactHero.tsx`

Use existing `BrokenWordHero` component. No new logic.

```tsx
import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function ContactHero() {
  return (
    <BrokenWordHero
      word="contact"
      propSrc="/props/prop-contact.png"
      propAlt="TunedUp Comms Handset"
      subline={
        <>
          Start a conversation about{' '}
          <HighlightWord>new work,</HighlightWord>
          <br />
          careers, or anything else.
        </>
      }
      propPosition="right"
    />
  )
}
```

---

## 3. `components/contact/wizard/WizardPill.tsx`

Reusable selectable pill. Two modes: `radio` (single select) and `checkbox` (multi-select).

**Unselected state:** white/canvas bg, `1px solid var(--line)`, ink text
**Selected state:** `var(--accent-soft)` bg, `1.5px solid var(--accent)`, ink text
**Hover state:** border becomes `1px solid var(--ink-soft)`
**Transition:** 150ms ease on all properties

```tsx
'use client'
import clsx from 'clsx'

type WizardPillProps = {
  label: string
  subtext?: string           // optional small line below label
  selected: boolean
  onClick: () => void
  mode?: 'radio' | 'checkbox'
  disabled?: boolean
}

export default function WizardPill({
  label,
  subtext,
  selected,
  onClick,
  mode = 'radio',
  disabled = false,
}: WizardPillProps) {
  return (
    <button
      type="button"
      role={mode === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'inline-flex flex-col items-center justify-center gap-0.5',
        'rounded-full px-6 py-3 transition-all duration-150',
        'font-mono text-sm font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        selected
          ? 'bg-[var(--accent-soft)] border-[1.5px] border-[var(--accent)] text-[var(--ink)]'
          : 'bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-soft)]',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
    >
      <span>{label}</span>
      {subtext && (
        <span className="font-mono text-[10px] text-[var(--ink-soft)] normal-case tracking-normal">
          {subtext}
        </span>
      )}
    </button>
  )
}
```

---

## 4. `components/contact/wizard/WizardInput.tsx`

Styled text input matching the design system.

```tsx
'use client'
import clsx from 'clsx'

type WizardInputProps = {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  required?: boolean
  optional?: boolean
  autoComplete?: string
}

export default function WizardInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  optional = false,
  autoComplete,
}: WizardInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        {label}
        {optional && (
          <span className="ml-2 normal-case tracking-normal text-[var(--ink-soft)] opacity-60">
            optional
          </span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className={clsx(
          'w-full rounded-2xl px-5 py-4',
          'bg-[var(--canvas)] border border-[var(--line)]',
          'font-body text-base text-[var(--ink)]',
          'placeholder:text-[var(--ink-soft)]',
          'focus:outline-none focus:border-[var(--ink)]',
          'transition-colors duration-150',
        )}
      />
    </div>
  )
}
```

---

## 5. `components/contact/wizard/WizardTextarea.tsx`

Styled textarea.

```tsx
'use client'
import clsx from 'clsx'

type WizardTextareaProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  rows?: number
  required?: boolean
  hint?: string
}

export default function WizardTextarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  required = false,
  hint,
}: WizardTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
        {label}
      </label>
      {hint && (
        <p className="font-body text-sm text-[var(--ink-soft)] -mt-1">{hint}</p>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        className={clsx(
          'w-full rounded-2xl px-5 py-4',
          'bg-[var(--canvas)] border border-[var(--line)]',
          'font-body text-base text-[var(--ink)]',
          'placeholder:text-[var(--ink-soft)]',
          'focus:outline-none focus:border-[var(--ink)]',
          'transition-colors duration-150 resize-none',
        )}
      />
    </div>
  )
}
```

---

## 6. `components/contact/wizard/WizardNavigation.tsx`

The GO BACK + CONTINUE/SUBMIT pills pinned to the bottom of the panel.

```tsx
'use client'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

type WizardNavigationProps = {
  onBack?: () => void
  onContinue?: () => void
  continueLabel?: string
  continueDisabled?: boolean
  loading?: boolean
  showBack?: boolean
}

export default function WizardNavigation({
  onBack,
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  loading = false,
  showBack = true,
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-[var(--line)]">
      <div>
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)] hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        )}
      </div>

      <div>
        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled || loading}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider bg-[var(--ink)] text-[var(--canvas)] hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Sending
              </>
            ) : (
              <>
                {continueLabel}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
```

---

## 7. `components/contact/wizard/WizardConfirmation.tsx`

Post-submit screen. Replaces wizard content after successful submission.

```tsx
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

type WizardConfirmationProps = {
  branch: 'project' | 'join'
  onReset: () => void
}

const content = {
  project: {
    headline: 'Message received.',
    body: "We'll reply within one business day — usually faster. In the meantime, take a look at",
    linkLabel: 'some of our work',
    linkHref: '/work',
  },
  join: {
    headline: 'Thanks for reaching out.',
    body: "We're not actively hiring right now, but we read every note. If there's a fit, you'll hear back.",
    linkLabel: null,
    linkHref: null,
  },
}

export default function WizardConfirmation({
  branch,
  onReset,
}: WizardConfirmationProps) {
  const c = content[branch]

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center py-16 gap-6"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
        <CheckCircle2 size={32} className="text-[var(--accent)]" />
      </div>

      <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
        {c.headline}
      </h3>

      <p className="font-body text-[var(--ink-mid)] max-w-md leading-relaxed">
        {c.body}{' '}
        {c.linkHref && c.linkLabel && (
          <Link
            href={c.linkHref}
            className="underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
          >
            {c.linkLabel}
          </Link>
        )}
        {c.linkHref && '.'}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors mt-4"
      >
        Start over
      </button>
    </div>
  )
}
```

---

## 8. `components/contact/wizard/ProjectBranch.tsx`

Four steps for the "Start a Project" branch.

### State shape

```ts
export type ProjectData = {
  services: string[]   // multi-select
  audience: string     // single-select
  budget: string       // single-select
  name: string
  email: string
  company: string
  phone: string
  description: string
}

export const emptyProjectData: ProjectData = {
  services: [],
  audience: '',
  budget: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  description: '',
}
```

### Step definitions

**Step 0 — What do you need?**
- Headline: `"Let's figure out what you're building."`
- Subline (font-body, ink-soft): `"Select everything that applies."`
- Mode: **checkbox** (multi-select)
- Pills:

```
Brand & Identity
Website / Web App
Mobile App
Google Ads & SEO
NGO / Church Ad Grants       ← subtext: "Google gives eligible orgs $10K/mo free — we'll connect you"
Workflow Automation
Not sure yet                 ← if selected, deselects all others
```

- Continue enabled: `services.length > 0`

**Step 1 — Who are you?**
- Headline: `"So we know the right questions to ask."`
- Mode: **radio** (single-select)
- Pills:

```
A Church or Ministry
An NGO or Nonprofit
An Entrepreneur / Solo Founder
A Startup or Scale-Up
Something else
```

- Continue enabled: `audience !== ''`

**Step 2 — What's your budget?**
- Headline: `"Honest answers save us both time."`
- Subline: `"What's your budget for this project?"`
- Mode: **radio** (single-select)
- Pills:

```
Under $5K
$5K – $15K
$15K – $40K
$40K – $100K
$100K+
Not sure yet
```

- Continue enabled: `budget !== ''`

**Step 3 — Tell us the rest.**
- Headline: `"Last step. Tell us the rest."`
- Form fields in a 2-column grid on desktop, 1-column on mobile:
  - Full Name (required)
  - Email (required, type="email")
  - Company / Organisation (optional)
  - Phone (optional, type="tel")
  - Description — full width, textarea, required, min 20 chars
    - Label: `"Tell us about the project"`
    - Hint: `"What are you building, who's it for, and what does success look like in 6 months?"`
    - Placeholder: `"We run weekly services for 2,000 people and need a website that actually helps newcomers find us..."`
- Continue label: `"Send Message"`
- Submit enabled: name + email valid + description.length >= 20

### Component signature

```tsx
'use client'

type ProjectBranchProps = {
  step: number
  data: ProjectData
  onChange: (patch: Partial<ProjectData>) => void
  onBack: () => void
  onContinue: () => void
  onSubmit: () => void
  loading: boolean
}

export default function ProjectBranch({
  step, data, onChange, onBack, onContinue, onSubmit, loading
}: ProjectBranchProps)
```

Each step is a separate JSX block rendered by a `switch(step)` inside the component. Wrap each step's content in a `motion.div` with `initial={{ opacity: 0, y: 12 }}` `animate={{ opacity: 1, y: 0 }}` `exit={{ opacity: 0, y: -12 }}` `transition={{ duration: 0.2 }}`.

Use `AnimatePresence mode="wait"` wrapping the switch output. Use the `step` as the `key` so Framer knows to animate between steps.

---

## 9. `components/contact/wizard/JoinBranch.tsx`

Two steps for the "Join Us" branch.

### State shape

```ts
export type JoinData = {
  role: string        // single-select
  name: string
  email: string
  location: string
  portfolio: string
  pitch: string
}

export const emptyJoinData: JoinData = {
  role: '',
  name: '',
  email: '',
  location: '',
  portfolio: '',
  pitch: '',
}
```

### Step definitions

**Step 0 — What kind of work do you do?**
- Headline: `"What kind of work do you do best?"`
- Mode: **radio** (single-select)
- Pills:

```
Designer
Developer
Content / Copywriter
Marketing & Ads
Other / Multi-skilled
```

- Continue enabled: `role !== ''`

**Step 1 — Tell us about yourself.**
- Headline: `"Tell us about yourself."`
- Subline (font-body, ink-soft): `"We're not actively hiring right now, but we love meeting talented people."`
- Form fields:
  - Full Name (required)
  - Email (required, type="email")
  - City / Country (optional)
  - Portfolio or LinkedIn (optional, type="url", placeholder: `"https://"`)
  - Textarea — required, min 20 chars
    - Label: `"What kind of work lights you up?"`
    - Placeholder: `"Tell us what you're best at, what you've built, and why you'd want to work with a team like ours."`
- Continue label: `"Send Application"`
- Submit enabled: name + email valid + pitch.length >= 20

### Component signature

```tsx
'use client'

type JoinBranchProps = {
  step: number
  data: JoinData
  onChange: (patch: Partial<JoinData>) => void
  onBack: () => void
  onContinue: () => void
  onSubmit: () => void
  loading: boolean
}

export default function JoinBranch({
  step, data, onChange, onBack, onContinue, onSubmit, loading
}: JoinBranchProps)
```

Same `AnimatePresence` + `motion.div` pattern as ProjectBranch. Use `step` as the animation key.

---

## 10. `components/contact/ContactWizard.tsx`

The main orchestrator. Client component.

### Full state

```ts
type Branch = 'project' | 'join' | null
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'
```

- `branch: Branch` — which branch is active
- `projectStep: number` — 0–3
- `joinStep: number` — 0–1
- `projectData: ProjectData`
- `joinData: JoinData`
- `submitStatus: SubmitStatus`
- `errorMessage: string`

### Panel layout

The wizard lives inside a single rounded panel:

```
bg-[var(--canvas)]
border border-[var(--line)]
rounded-3xl
p-8 lg:p-16
min-h-[560px]
flex flex-col justify-between
```

**Top of panel — branch selector tabs (always visible):**

Three pills in a row (or wrapping on mobile):

```
[Start a Project]   [Join Us]   [Book a Call — Coming Soon]
```

Rules:
- When `branch === null`: all three pills show in their default unselected state (except Book a Call which is always greyed)
- When `branch === 'project'`: "Start a Project" pill shows selected (accent bg)
- When `branch === 'join'`: "Join Us" pill shows selected
- Clicking an active branch tab resets that branch back to step 0 and clears its data
- Clicking a different branch tab switches branches and resets

"Book a Call" pill:
- Always `disabled`
- Has a small tag beside it: `"Soon"` in font-mono text-[10px] bg-[var(--ink-soft)] text-[var(--canvas)] rounded-full px-2 py-0.5
- Renders as: `<button disabled>Book a Call <span class="soon-tag">Soon</span></button>`
- Cursor: not-allowed

**Step counter (shown when branch !== null and not submitted):**

Top-right of panel:
```
font-mono text-xs text-[var(--ink-soft)]
"Step X of Y"
```

Project: Y = 4. Join: Y = 2.

**Middle of panel — dynamic content:**

When `branch === null`: A centered greeting:
```
font-display text-2xl md:text-3xl text-center max-w-lg mx-auto

"Hey there. What brings you to the workshop today?"
```

Below that, the three branch pills (same ones as the tab row — on mobile the tab row might be compressed so repeat them here centered as the call-to-action when no branch is selected). Actually: just show the branch selector pills in the center of the panel when no branch is selected. Remove the top tab row on mobile in this state to avoid redundancy.

When `branch !== null && submitStatus !== 'success'`: Render `ProjectBranch` or `JoinBranch`.

When `submitStatus === 'success'`: Render `WizardConfirmation`.

**Error state:**

If `submitStatus === 'error'`, show a small error banner above the navigation:
```
bg-red-50 border border-red-200 rounded-xl px-4 py-3
font-body text-sm text-red-700
"Something went wrong. Please try again or email us directly at prem@tunedup.one"  // TODO: update email
```

### Navigation logic

```
PROJECT BRANCH:
  projectStep === 0: back → branch = null, step = 0
  projectStep === 1–3: back → projectStep--
  projectStep === 0–2: continue → projectStep++
  projectStep === 3: continue → handleSubmit('project')

JOIN BRANCH:
  joinStep === 0: back → branch = null, step = 0
  joinStep === 1: back → joinStep--
  joinStep === 0: continue → joinStep++
  joinStep === 1: continue → handleSubmit('join')
```

### Submit handler

```ts
async function handleSubmit(branch: 'project' | 'join') {
  setSubmitStatus('loading')
  try {
    const payload = {
      branch,
      data: branch === 'project' ? projectData : joinData,
      submittedAt: new Date().toISOString(),
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Server error')
    setSubmitStatus('success')
  } catch (err) {
    setSubmitStatus('error')
    setErrorMessage('Something went wrong.')
  }
}
```

### Reset

```ts
function handleReset() {
  setBranch(null)
  setProjectStep(0)
  setJoinStep(0)
  setProjectData(emptyProjectData)
  setJoinData(emptyJoinData)
  setSubmitStatus('idle')
  setErrorMessage('')
}
```

---

## 11. `components/contact/DirectContactPills.tsx`

Three cards below the wizard. Simple, no state.

```tsx
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'prem@tunedup.one',         // TODO: update
    href: 'mailto:prem@tunedup.one',   // TODO: update
    description: 'For detailed briefs',
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Quick chat',
    href: 'https://wa.me/91XXXXXXXXXX', // TODO: update with real number
    description: 'Fastest response',
    external: true,
  },
  {
    icon: Calendar,
    label: 'Book a Call',
    value: '20 min · Free',
    href: '#',                          // TODO: wire to booking when ready
    description: 'Coming soon',
    external: false,
    disabled: true,
  },
]
```

Card design:
- `border border-[var(--line)] rounded-2xl p-6`
- Icon (24px) + label (mono xs uppercase) + value (body base) + description (mono xs ink-soft)
- Hover: `hover:border-[var(--ink)] transition-colors`
- Disabled card (Book a Call): `opacity-50 cursor-not-allowed pointer-events-none`
- The email and WhatsApp cards are `<a>` tags. The disabled one is a `<div>`.

Grid: `grid grid-cols-1 md:grid-cols-3 gap-4 mt-12`

MonoLabel above: `/ Direct frequencies`

---

## 12. `app/api/contact/route.ts`

Placeholder only. No email sending yet.

```ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // TODO: integrate Resend for email notifications
    // TODO: integrate n8n webhook for automation
    console.log('=== Contact Form Submission ===')
    console.log('Branch:', body.branch)
    console.log('Data:', JSON.stringify(body.data, null, 2))
    console.log('Submitted at:', body.submittedAt)
    console.log('==============================')

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
```

---

## 13. Wrapping section in `app/contact/page.tsx`

The wizard needs a `ContainerSection` wrapper for consistent padding. Add this to the page or inside `ContactWizard.tsx` itself — whichever is cleaner given existing patterns in the codebase.

Suggested structure inside `ContactWizard.tsx`:

```tsx
return (
  <section className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <MonoLabel className="block mb-4">/ Get in Touch</MonoLabel>
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.02em] max-w-3xl mb-16">
        Have a project, a question,{' '}
        <HighlightWord>or just want to say hello?</HighlightWord>
      </h2>

      {/* The wizard panel */}
      <div className="bg-[var(--canvas)] border border-[var(--line)] rounded-3xl p-8 lg:p-16 min-h-[560px] flex flex-col">
        {/* ... wizard content ... */}
      </div>
    </div>
  </section>
)
```

---

## 14. Accessibility checklist (build these in, not as an afterthought)

- All `WizardPill` buttons have `aria-checked` and `role="radio"` or `role="checkbox"`
- Group radio pills in a `<div role="radiogroup" aria-label="[question label]">`
- Group checkbox pills in a `<div role="group" aria-label="[question label]">`
- When step changes, focus moves to the step headline: use a `ref` on each headline `h3` and call `.focus()` inside a `useEffect` watching `step`
- All form inputs have associated labels (using the `WizardInput` / `WizardTextarea` components which render labels explicitly)
- Submit button uses `aria-busy={loading}`
- Confirmation screen uses `role="status"` `aria-live="polite"`
- "Book a Call" pill has `aria-disabled="true"` and `title="Coming soon"`

---

## 15. Execution order for Cursor

Build in this exact order. Show me the result after each checkpoint.

```
CHECKPOINT 1 — Sub-components
  1. WizardPill.tsx
  2. WizardInput.tsx
  3. WizardTextarea.tsx
  4. WizardNavigation.tsx
  5. WizardConfirmation.tsx
  Show me these five files. I will review before you continue.

CHECKPOINT 2 — Branch components
  6. ProjectBranch.tsx (all 4 steps)
  7. JoinBranch.tsx (all 2 steps)
  Show me these two files. I will review before you continue.

CHECKPOINT 3 — Main wizard + page
  8. ContactWizard.tsx
  9. DirectContactPills.tsx
  10. ContactHero.tsx
  11. app/contact/page.tsx
  12. app/api/contact/route.ts
  Run npm run dev. Navigate to /contact. Show me a screenshot or describe what renders.

CHECKPOINT 4 — Test flows
  13. Click "Start a Project" → verify all 4 steps render with correct content
  14. Click through to final form → submit → verify console.log fires
  15. Click "Join Us" → verify both steps render
  16. Click through to final form → submit → verify console.log fires
  17. Click "Book a Call" → verify it is not clickable and shows "Soon" tag
  18. Test "Go Back" at every step → verify state is preserved (selections don't reset)
  19. Test on 375px mobile width → verify pills wrap, form fields stack, panel is usable

CHECKPOINT 5 — Accessibility
  20. Tab through the entire wizard keyboard-only → verify focus is logical
  21. Check aria-checked on selected pills via browser DevTools
  22. Verify focus moves to step headline on step change
```

---

## NON-NEGOTIABLE RULES FOR CURSOR

1. **No new npm packages** unless absolutely required. Use existing: `framer-motion`, `lucide-react`, `clsx`

2. **No hardcoded colors or fonts.** Always use CSS variables and Tailwind font utilities

3. **No lorem ipsum.** Every string in this document is final copy. Use it verbatim.

4. **No `any` types** except where Sanity returns untyped data (not relevant here — no Sanity on this page)

5. **Server component by default.** Only `ContactWizard.tsx`, `ProjectBranch.tsx`, `JoinBranch.tsx`, `WizardPill.tsx`, `WizardNavigation.tsx` need `'use client'`

6. **Mobile first.** Pills must wrap gracefully. Panel must be usable at 375px. Form fields must stack on mobile.

7. **Preserve branch state when switching steps.** Going back must restore the user's previous selections — never wipe state on back navigation.

8. **TODO comments** for: email address, WhatsApp number, Calendly URL (already marked in this doc)

9. **Pause after each checkpoint.** Show me the output before continuing.
