import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import { getWorkedOnCategoryLabel } from '@/lib/data/workedOnCategories'
import type { WorkedOnItem } from '@/lib/types/mission'

const CATEGORY_NUMBERS: Record<string, string> = {
  'brand-identity': '/01',
  development: '/02',
  design: '/03',
  marketing: '/04',
  strategy: '/05',
  automation: '/06',
}

export default function WeWorkedOn({ workedOn }: { workedOn?: WorkedOnItem[] }) {
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
            key={item.category ?? i}
            className="bg-white border border-[var(--line)] rounded-2xl p-6 lg:p-8 flex flex-col gap-4"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-display font-bold text-2xl lg:text-3xl">
                {getWorkedOnCategoryLabel(item.category)}
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                {CATEGORY_NUMBERS[item.category] || `/0${i + 1}`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags?.map((tag) => (
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
