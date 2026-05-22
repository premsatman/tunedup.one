# TunedUp — Book a Call (Calendly Integration)
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> This activates the "Book a Call" pill in the contact wizard
> and wires it to Calendly via popup — no new npm packages required.
> Follow the existing design system exactly.

---

## CONTEXT

The contact wizard at `/contact` currently has three pills:
- Start a Project ✅ (built)
- Join Us ✅ (built)
- Book a Call 🔒 (greyed out, "Soon" tag — we are now activating this)

This prompt does four things:
1. Creates a reusable `CalendlyPopup` client component that loads
   Calendly's script on demand and opens a popup modal
2. Activates the "Book a Call" pill in `ContactWizard.tsx` — removes
   the greyed/disabled state, removes the "Soon" tag
3. Wires the pill click to open the Calendly popup
4. Updates the `DirectContactPills` "Book a Call" card to also open
   the same Calendly popup (currently disabled with `href="#"`)

No new npm packages. No inline embeds. No Calendly badge/floating widget.
Calendly script loads only when the user clicks the button (on demand).

---

## STEP 0 — GET YOUR CALENDLY URL

Before writing any code, confirm your Calendly event URL.
It looks like: `https://calendly.com/YOUR_USERNAME/20-minute-free-call`

Go to Calendly → Event Types → your "20 Minute Free Call" event
→ click Share → copy the link. It is your `CALENDLY_URL`.

Add it to `.env.local`:
```
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/YOUR_USERNAME/20-minute-free-call"
```

Cursor: after adding to `.env.local`, use
`process.env.NEXT_PUBLIC_CALENDLY_URL` everywhere the URL is needed.
Never hardcode the URL string.

---

## WHAT WE ARE NOT BUILDING

Do NOT:
- Install `react-calendly` npm package
- Add a Calendly inline embed (`<div class="calendly-inline-widget">`)
- Add the Calendly badge/floating widget
- Load the Calendly script in `app/layout.tsx` (load on demand only)
- Show any Calendly UI before the user clicks the button

---

## FILE CHANGES REQUIRED

```
NEW FILE:
components/contact/CalendlyPopup.tsx   ← the popup trigger component

MODIFIED FILES:
components/contact/ContactWizard.tsx   ← activate Book a Call pill
components/contact/DirectContactPills.tsx ← activate Book a Call card
```

---

## 1. `components/contact/CalendlyPopup.tsx`

Client component. Loads Calendly script on demand when `open()` is called.
Exposes a single `openCalendly()` function via a ref or callback pattern.

Build it as a hook + button wrapper:

```tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

type CalendlyPopupProps = {
  url: string
  children: React.ReactNode   // whatever button UI you want
  className?: string
}

export default function CalendlyPopup({
  url,
  children,
  className = '',
}: CalendlyPopupProps) {
  const scriptLoaded = useRef(false)
  const cssLoaded = useRef(false)

  // Load Calendly CSS (once)
  const loadCSS = useCallback(() => {
    if (cssLoaded.current) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)
    cssLoaded.current = true
  }, [])

  // Load Calendly script (once) then open popup
  const openCalendly = useCallback(() => {
    loadCSS()

    if (window.Calendly) {
      // Script already loaded — open immediately
      window.Calendly.initPopupWidget({ url })
      return
    }

    if (scriptLoaded.current) {
      // Script is loading — wait for it
      const wait = setInterval(() => {
        if (window.Calendly) {
          clearInterval(wait)
          window.Calendly.initPopupWidget({ url })
        }
      }, 100)
      return
    }

    // First click — load the script then open
    scriptLoaded.current = true
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      window.Calendly?.initPopupWidget({ url })
    }
    document.body.appendChild(script)
  }, [url, loadCSS])

  return (
    <button
      type="button"
      onClick={openCalendly}
      className={className}
      aria-label="Book a free 20-minute call"
    >
      {children}
    </button>
  )
}
```

Key behaviours:
- First click: loads script + CSS, opens popup when script is ready
- Subsequent clicks: script already loaded, popup opens instantly
- No script in `<head>`, no layout impact, no layout shift
- `window.Calendly` is properly typed via the `declare global` block

---

## 2. Update `components/contact/ContactWizard.tsx`

### 2a. Remove the "Soon" tag and disabled state from Book a Call pill

Find the "Book a Call" pill section. It currently renders something like:

```tsx
// CURRENT (disabled state — REMOVE THIS):
<button disabled aria-disabled="true" title="Coming soon" ...>
  Book a Call
  <span className="...soon-tag...">Soon</span>
</button>
```

Replace it with the `CalendlyPopup` component, styled to match the
existing selected/unselected pill pattern:

```tsx
import CalendlyPopup from '@/components/contact/CalendlyPopup'

// NEW (active state):
<CalendlyPopup
  url={process.env.NEXT_PUBLIC_CALENDLY_URL!}
  className={clsx(
    'inline-flex items-center gap-2 rounded-full font-mono text-xs',
    'uppercase tracking-wider transition-all duration-200 hover:scale-[1.02]',
    'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--line)] px-6 py-3',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
  )}
>
  <Calendar size={14} />
  Book a Call
</CalendlyPopup>
```

Import `Calendar` from `lucide-react` (already installed).
Import `clsx` (already installed).

### 2b. The greeting panel state

When `branch === null` (initial state), the panel shows three pills:
`Start a Project` / `Join Us` / `Book a Call`

The Book a Call pill in this position also uses `CalendlyPopup`.
Same className as above. No step counter shown for Book a Call
(it opens a popup, not a wizard step).

### 2c. The top tab row (branch selector, shown when a branch is active)

When `branch === 'project'` or `branch === 'join'`, the top tab row
still shows all three pills. Book a Call in the tab row also uses
`CalendlyPopup` — clicking it opens Calendly without changing the
active branch or resetting wizard state.

This is intentional: a visitor halfway through the project wizard can
still click Book a Call and the popup appears over the current wizard
state. When they close Calendly, the wizard is still where they left it.

---

## 3. Update `components/contact/DirectContactPills.tsx`

The "Book a Call" card is currently a disabled `<div>` with
`opacity-50 cursor-not-allowed pointer-events-none`.

Replace the entire disabled card with an active card using
`CalendlyPopup`:

Find the current disabled card (something like):
```tsx
// CURRENT:
{
  icon: Calendar,
  label: 'Book a Call',
  value: '20 min · Free',
  href: '#',
  description: 'Coming soon',
  disabled: true,
}
```

Replace the disabled card's rendered JSX with:

```tsx
<CalendlyPopup
  url={process.env.NEXT_PUBLIC_CALENDLY_URL!}
  className="flex items-center gap-4 bg-[var(--ink)] text-[var(--canvas)] rounded-2xl p-6 hover:scale-[1.02] transition-transform w-full text-left"
>
  <Calendar size={24} />
  <div>
    <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
      Schedule
    </div>
    <div className="font-body font-medium">20 min · Free call</div>
    <div className="font-mono text-xs text-[var(--ink-soft)] mt-0.5">
      Tue & Thu · 8:30–11:30pm IST
    </div>
  </div>
</CalendlyPopup>
```

Note: this card is dark (`bg-[var(--ink)]`) to stand out as the
primary CTA in the direct contact section.

---

## 4. Environment variable reminder

Cursor: after all component changes, check that `.env.local` has:
```
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/YOUR_USERNAME/20-minute-free-call"
```

If the env variable is missing, the popup button will call `initPopupWidget`
with `undefined` as the URL and nothing will open. Add a runtime guard:

In `CalendlyPopup.tsx`, add this check at the top of `openCalendly`:
```ts
if (!url) {
  console.warn('CalendlyPopup: NEXT_PUBLIC_CALENDLY_URL is not set')
  return
}
```

---

## 5. Prefill visitor data (optional enhancement)

If the visitor already filled in Step 3 of the Project wizard (name +
email), you can prefill those fields in the Calendly popup so they
don't have to type them again.

To enable this, extend `CalendlyPopupProps`:

```tsx
type CalendlyPopupProps = {
  url: string
  children: React.ReactNode
  className?: string
  prefill?: {
    name?: string
    email?: string
  }
}
```

And update the `initPopupWidget` call:
```ts
window.Calendly.initPopupWidget({
  url,
  prefill: props.prefill ?? {},
})
```

In `ContactWizard.tsx`, when Book a Call is clicked after the visitor
has filled in the project form fields:
```tsx
<CalendlyPopup
  url={process.env.NEXT_PUBLIC_CALENDLY_URL!}
  prefill={{
    name: projectData.name,
    email: projectData.email,
  }}
  ...
>
  Book a Call
</CalendlyPopup>
```

This is optional — implement only if it doesn't add complexity.

---

## 6. Listen for successful booking (optional analytics hook)

Calendly fires a `message` event when a booking is completed.
Add this to `CalendlyPopup.tsx` if you want to track conversions:

```tsx
useEffect(() => {
  function handleCalendlyEvent(e: MessageEvent) {
    if (
      e.origin === 'https://calendly.com' &&
      e.data?.event === 'calendly.event_scheduled'
    ) {
      // Booking confirmed — add analytics here later
      console.log('Calendly booking confirmed:', e.data.payload)
      // TODO: fire to analytics (Plausible, GA4, etc.)
    }
  }
  window.addEventListener('message', handleCalendlyEvent)
  return () => window.removeEventListener('message', handleCalendlyEvent)
}, [])
```

This is a foundation for future automation — when we wire n8n,
this event can trigger the HubSpot lead creation workflow.

---

## 7. Accessibility

- `CalendlyPopup` renders a `<button>` — correct semantic element
- `aria-label="Book a free 20-minute call"` is set on the button
- Focus ring uses `focus-visible:ring-2 focus-visible:ring-[var(--accent)]`
- The Calendly popup itself is managed by Calendly — it handles
  focus trapping and `aria-modal` internally
- When the popup closes, focus returns to the triggering button
  (Calendly handles this natively)

---

## 8. What does NOT change

Do NOT modify:
- `ProjectBranch.tsx` (any step)
- `JoinBranch.tsx` (any step)
- `WizardPill.tsx`
- `WizardInput.tsx`
- `WizardTextarea.tsx`
- `WizardNavigation.tsx`
- `WizardConfirmation.tsx`
- `app/api/contact/route.ts`
- Any shared components (`BrokenWordHero`, `MonoLabel`, `Pill`, etc.)
- `app/layout.tsx` (do NOT add Calendly script here)

---

## 9. Execution order

```
STEP 1 — Environment
  Add NEXT_PUBLIC_CALENDLY_URL to .env.local
  Confirm your Calendly event URL is correct by opening it in a browser

STEP 2 — Create CalendlyPopup component
  Create components/contact/CalendlyPopup.tsx
  Show me the file. I will review before continuing.

STEP 3 — Update ContactWizard
  Activate the Book a Call pill (remove disabled/Soon state)
  Wire CalendlyPopup in: greeting panel + tab row
  Show me the changed section only. I will review.

STEP 4 — Update DirectContactPills
  Replace disabled Book a Call card with active CalendlyPopup card
  Show me the changed section only. I will review.

STEP 5 — Test
  Run npm run dev
  Navigate to /contact
  Click Book a Call in the greeting panel → Calendly popup opens ✓
  Click Book a Call in the tab row → same popup opens ✓
  Click Book a Call in DirectContactPills → same popup opens ✓
  Complete a test booking → booking appears in your Calendly dashboard ✓
  Check Google Calendar → event created automatically ✓
  Check Google Meet link → included in the calendar event ✓
  Test on mobile 375px → popup renders correctly ✓

STEP 6 — Verify no regressions
  Start a Project flow → still works end to end ✓
  Join Us flow → still works end to end ✓
  No Calendly script loaded on page load (check Network tab) ✓
  Calendly script appears in Network tab only after first click ✓
```

---

## NON-NEGOTIABLE RULES

1. **No new npm packages.** Use vanilla JS to load Calendly script.
2. **Script loads on demand only.** Never in layout.tsx or page.tsx.
3. **No hardcoded Calendly URL.** Always use `process.env.NEXT_PUBLIC_CALENDLY_URL`.
4. **No inline onclick handlers.** Use React's `onClick` prop.
5. **No `any` types.** Use the `declare global Window` extension.
6. **Design system only.** All classNames use CSS variables and existing
   Tailwind utilities. No new colors. No hardcoded hex values.
7. **Pause after Step 2.** Show me `CalendlyPopup.tsx` before touching
   any existing files.
