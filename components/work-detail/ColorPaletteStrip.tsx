import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import type { ColorSwatch } from '@/lib/types/mission'

export default function ColorPaletteStrip({ palette }: { palette?: ColorSwatch[] }) {
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
              <div className="font-body text-sm font-medium">{color.name}</div>
              <div className="font-mono text-xs text-[var(--ink-soft)] uppercase">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </ContainerSection>
  )
}
