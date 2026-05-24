# TunedUp — Gantt Operators (Avatar Stack on Timeline)
# Cursor Build Prompt

> Paste this entire document into Cursor AI chat.
> Adds operator avatars (team member photos) to each phase of the
> Gantt timeline on case study detail pages. Avatars appear as a
> stacked group on the right edge of each colored phase bar, with
> a deduplicated legend below the timeline.
>
> No new npm packages. No new components. Modifies 3 files only.

---

## CONTEXT

The case study detail page at `/work/[slug]` already has a working
GanttTimeline component built from the previous prompt. Each phase
shows: phase name + week range label, colored duration bar, and a
small `Xw` duration tag inside the bar.

We are now adding **operator attribution** — for each phase, you
can pick team members (operators) who worked on it. Their avatars
appear as a stacked circle group on the right side of each phase
bar, with a deduplicated legend below the timeline showing all
unique operators with their names.

Inspired by Designmonks case study Gantt visualization.

---

## DESIGN INTENT

- Operators are references to existing `teamMember` Sanity records
- Max 5 operators per phase (validation)
- Avatars overlap with `-space-x-2` and white ring borders
- Show up to 4 avatars in the stack — beyond that, render `+N` counter
- Hover any avatar reveals the operator's name (native browser tooltip)
- Legend below the Gantt: small avatar + name for every UNIQUE operator
  across all phases, deduplicated by `_id`
- Graceful empty state: if a phase has no operators, the right side
  of its bar stays clean — no broken layout, no placeholder

---

## FILES TO MODIFY

```
1. studio/schemas/caseStudy.ts         ← Add operators field to phase
2. lib/sanity/queries.ts               ← Dereference operators in query
3. components/work-detail/GanttTimeline.tsx ← Render avatar stack + legend
```

No new files. No components to delete. No npm packages to install.

---

## 1. UPDATE: `studio/schemas/caseStudy.ts`

Find the `projectTimeline` field (in the `process` group). It currently
looks like this:

```ts
defineField({
  name: 'projectTimeline',
  title: 'Project Timeline (Gantt phases)',
  type: 'array',
  group: 'process',
  description: 'Phases of the project, in order',
  validation: (Rule) => Rule.required().min(3).max(8),
  of: [
    {
      type: 'object',
      name: 'phase',
      fields: [
        // phaseName, startWeek, durationWeeks, color ...
      ],
      preview: { ... },
    },
  ],
}),
```

Inside the phase object's `fields` array, AFTER the existing `color`
field, ADD this new field:

```ts
{
  name: 'operators',
  type: 'array',
  title: 'Operators (who worked on this phase)',
  description: 'Team members involved in this phase. Their avatars will stack on the Gantt bar.',
  of: [
    {
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
  ],
  validation: (Rule) => Rule.max(5),
},
```

Then REPLACE the existing `preview` block for the phase object with
this updated version that shows operator names in the Sanity Studio
list view:

```ts
preview: {
  select: {
    name: 'phaseName',
    start: 'startWeek',
    duration: 'durationWeeks',
    op0: 'operators.0.name',
    op1: 'operators.1.name',
    op2: 'operators.2.name',
  },
  prepare({ name, start, duration, op0, op1, op2 }) {
    const ops = [op0, op1, op2].filter(Boolean).join(', ')
    return {
      title: name,
      subtitle: `Week ${start} → ${start + duration - 1}${ops ? ' · ' + ops : ''}`,
    }
  },
},
```

---

## 2. UPDATE: `lib/sanity/queries.ts`

Find the `missionBySlugQuery`. Locate the `projectTimeline` projection
inside the query. It currently reads:

```ts
projectTimeline[] {
  phaseName,
  startWeek,
  durationWeeks,
  color,
},
```

REPLACE it with this version that dereferences operators to fetch
their name and photo from the teamMember document:

```ts
projectTimeline[] {
  phaseName,
  startWeek,
  durationWeeks,
  color,
  operators[]-> {
    _id,
    name,
    photo,
  },
},
```

The `->` is the GROQ dereference operator. It expands the reference
into the actual team member's data, so the GanttTimeline component
receives the full operator object (id, name, photo) instead of just
a reference ID.

No other queries need changes.

---

## 3. REPLACE: `components/work-detail/GanttTimeline.tsx`

Replace the ENTIRE file contents with this new version. The changes
from the existing version:

- Phase bar height increases from `h-8` to `h-10` (room for avatars)
- Inside the bar: `justify-between` layout — duration tag on left,
  avatar stack on right
- New: avatar stack with overlapping circles and white ring borders
- New: `+N` counter when more than 4 operators
- New: legend strip below the Gantt with deduplicated operator list
- `min-w-[600px]` increases to `min-w-[700px]` (room for avatars
  on mobile horizontal scroll)

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

type Operator = {
  _id: string
  name: string
  photo: any
}

type Phase = {
  phaseName: string
  startWeek: number
  durationWeeks: number
  color: string
  operators?: Operator[]
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

  // Calculate total weeks span
  const totalWeeks = Math.max(
    ...phases.map((p) => p.startWeek + p.durationWeeks - 1)
  )
  const weekMarkers = Array.from({ length: totalWeeks }, (_, i) => i + 1)

  // Deduplicate operators across all phases for legend
  const uniqueOperators = Array.from(
    new Map(
      phases
        .flatMap((p) => p.operators || [])
        .map((op) => [op._id, op])
    ).values()
  )
  const hasAnyOperators = uniqueOperators.length > 0

  return (
    <div className="bg-white border border-[var(--line)] rounded-2xl p-6 lg:p-8 overflow-x-auto">
      <div className="min-w-[700px]">
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
                <div className="flex-1 relative h-10 bg-[var(--canvas)] rounded-lg overflow-hidden">
                  <div
                    className={`absolute top-0 bottom-0 rounded-lg flex items-center justify-between px-3 ${
                      COLOR_CLASSES[phase.color] || COLOR_CLASSES.teal
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    {/* Left: Duration tag */}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/70 whitespace-nowrap">
                      {phase.durationWeeks}w
                    </span>

                    {/* Right: Operator avatar stack */}
                    {phase.operators && phase.operators.length > 0 && (
                      <div className="flex items-center -space-x-2">
                        {phase.operators.slice(0, 4).map((op, idx) => (
                          <div
                            key={op._id}
                            className="relative w-7 h-7 rounded-full overflow-hidden bg-white ring-2 ring-white"
                            style={{ zIndex: phase.operators!.length - idx }}
                            title={op.name}
                          >
                            {op.photo ? (
                              <Image
                                src={urlFor(op.photo).width(80).height(80).url()}
                                alt={op.name}
                                fill
                                sizes="28px"
                                className="object-cover"
                              />
                            ) : (
                              /* Fallback: initial on dark circle */
                              <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)] text-[var(--canvas)] font-mono text-[10px] font-bold">
                                {op.name?.[0]}
                              </div>
                            )}
                          </div>
                        ))}
                        {phase.operators.length > 4 && (
                          <div
                            className="relative w-7 h-7 rounded-full bg-black/30 ring-2 ring-white flex items-center justify-center font-mono text-[9px] font-bold text-white"
                            title={`${phase.operators.length - 4} more`}
                          >
                            +{phase.operators.length - 4}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend — deduplicated operator list */}
        {hasAnyOperators && (
          <div className="mt-6 pt-6 border-t border-[var(--line)]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-soft)] mb-3">
              / Operators
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {uniqueOperators.map((op) => (
                <div key={op._id} className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-[var(--canvas)] flex-shrink-0">
                    {op.photo ? (
                      <Image
                        src={urlFor(op.photo).width(40).height(40).url()}
                        alt={op.name}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--ink)] text-[var(--canvas)] font-mono text-[8px] font-bold">
                        {op.name?.[0]}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-mid)]">
                    {op.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## EXECUTION ORDER FOR CURSOR

```
CHECKPOINT 1 — Sanity schema
  Open studio/schemas/caseStudy.ts
  Locate projectTimeline field
  Inside the phase object's fields array, ADD the operators field
  after the existing color field
  Replace the phase preview block with the new version that
  shows operator names in subtitle
  Show me the updated projectTimeline field. I will review.

CHECKPOINT 2 — Sanity query
  Open lib/sanity/queries.ts
  Locate missionBySlugQuery
  Update the projectTimeline projection to dereference operators
  Show me the updated query. I will review.

CHECKPOINT 3 — GanttTimeline component
  Open components/work-detail/GanttTimeline.tsx
  Replace ENTIRE file with the new version
  Show me the updated file. I will review.

CHECKPOINT 4 — Test in Sanity Studio
  Restart Sanity Studio (npm run dev in studio dir, or claude.ai
  rebuilds it)
  Open an existing case study at /admin
  Go to Design Process tab
  Click into any phase
  Verify the new "Operators" field appears with an "Add operator"
  button
  Add 1-3 team members to a phase
  Save
  Tell me what you see in Sanity Studio.

CHECKPOINT 5 — Test on the live page
  Run npm run dev
  Navigate to /work/[slug] for the case study where you added
  operators
  Scroll to the Design Process section
  Verify:
    ✓ Avatar stack appears on the right side of phase bars
      that have operators
    ✓ Phase bars without operators show clean right side
      (no broken layout)
    ✓ Hovering an avatar shows the operator's name
    ✓ Legend appears below the Gantt with all unique operators
    ✓ Avatars overlap correctly with white ring borders
    ✓ If you add 5+ operators to one phase, the +N counter appears
  Tell me what renders and I'll guide any fixes.

CHECKPOINT 6 — Mobile test
  Resize browser to 375px width OR use device emulation
  Scroll to Gantt section
  Verify:
    ✓ Horizontal scrolling works inside the Gantt container
    ✓ Avatars don't overflow or get clipped
    ✓ Legend wraps gracefully
  Tell me what you see.
```

---

## NON-NEGOTIABLE RULES

1. **No new npm packages.** Everything uses existing dependencies
   (next/image, urlFor from existing sanity client).

2. **No new components.** This is a modification to ONE existing
   component plus the Sanity schema and query.

3. **Server component.** GanttTimeline stays as a server component.
   No useState, no `'use client'`.

4. **Graceful empty states.** A phase without operators must render
   the bar cleanly. The legend hides entirely when no operators
   exist across any phases.

5. **Don't change other case study sections.** This prompt only
   touches the Gantt. The CaseHero, WeWorkedOn, ProblemSection,
   etc. all stay exactly as they are.

6. **Photo fallback.** If a team member has no photo set in Sanity,
   the avatar shows their first initial on a dark circle. This must
   work — never render a broken image icon.

7. **TypeScript strict.** The Operator type definition is included
   in the component. Use it. Don't introduce `any` outside the
   photo field (Sanity image objects).

8. **Pause after each checkpoint.** Show me output before continuing.

---

## SAMPLE CONTENT FOR TESTING

After Cursor completes the build, fill in operators on your Edvara
case study like this. Each phase gets the team members who actually
worked on it:

```
Phase 1 — Discovery & Strategy
  Operators: Prem

Phase 2 — Logo Exploration
  Operators: Prem, Sachin Dwivedi, Tarsh Majhi

Phase 3 — Wordmark & Symbol Refinement
  Operators: Sachin Dwivedi, Tarsh Majhi

Phase 4 — Color & Typography System
  Operators: Tarsh Majhi, Prem

Phase 5 — Brand Applications
  Operators: Sachin Dwivedi, Prem

Phase 6 — Guidelines Document
  Operators: Prem
```

This requires Sachin Dwivedi and Tarsh Majhi to exist as
`teamMember` documents in Sanity first. If they don't, create
minimal teamMember records for them (name + role + photo if you
have one) before adding them as operators.

If you don't want to add them as official team members on the
Workshop page (because they're collaborators, not staff), you have
two options:

Option A — Add them as team members but mark them differently:
  Create a `collaborator` boolean field on teamMember schema,
  and have the CrewSection component filter them out.

Option B — Add a separate `collaborator` document type:
  More work, but cleaner. Operators field would then reference
  either teamMember OR collaborator types.

For now, Option A is simpler. Decide when you fill in the Edvara
content.

---

## WHAT THIS DELIVERS

After Cursor completes:

✓ Sanity Studio: every phase has an "Operators" picker that
  searches all team members and lets you pick up to 5
✓ Live page: each Gantt bar shows up to 4 stacked avatars on its
  right side, with a +N counter beyond that
✓ Hover any avatar to see the operator's name
✓ Below the Gantt: a clean legend showing every unique operator
  across all phases (no duplicates if someone worked on multiple
  phases)
✓ Photo updates flow through automatically — change an operator's
  photo in their teamMember record and every Gantt they appear in
  updates on next page rebuild
✓ Graceful empty states throughout — phases without operators
  render fine, page without any operators hides the legend entirely
