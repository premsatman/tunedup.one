import WorkDetailIntro from '@/components/work-detail/WorkDetailIntro'
import type { ColorSwatch } from '@/lib/types/mission'

const SwatchLabels = ({ color }: { color: ColorSwatch }) => (
  <>
    {color.name ? (
      <div className="font-body text-[10px] font-medium leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-xs lg:text-[10px]">
        {color.name}
      </div>
    ) : (
      <span aria-hidden />
    )}

    {color.hex ? (
      <div className="font-mono text-[9px] uppercase leading-tight tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-[10px] lg:text-[9px]">
        {color.hex}
      </div>
    ) : (
      <span aria-hidden />
    )}
  </>
)

export default function ColorPaletteStrip({ palette }: { palette?: ColorSwatch[] }) {
  if (!palette?.length) return null

  return (
    <>
      <WorkDetailIntro title="Color Palette" className="pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12" />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-14 lg:px-12 lg:pb-20">
        <div className="mx-auto aspect-video w-full max-w-[min(100%,120rem)] lg:aspect-[1920/540] lg:max-w-[120rem]">
          {/* Small screens: tall bars */}
          <div className="flex h-full w-full gap-2 sm:gap-3 lg:hidden">
            {palette.map((color, i) => (
              <div
                key={color.hex ?? color.name ?? i}
                className="flex min-w-0 flex-1 origin-bottom scale-y-95 flex-col justify-between rounded-xl p-3 transition-transform duration-300 ease-out hover:scale-y-100 hover:shadow-lg sm:rounded-2xl sm:p-4"
                style={{ backgroundColor: color.hex ?? '#000000' }}
              >
                <SwatchLabels color={color} />
              </div>
            ))}
          </div>

          {/* Large screens: 1920×540 frame, centered squares */}
          <div className="hidden h-full w-full items-center justify-center gap-2 px-3 sm:gap-3 lg:flex">
            {palette.map((color, i) => (
              <div
                key={color.hex ?? color.name ?? i}
                className="flex aspect-square h-auto max-h-[88%] min-w-0 w-full max-w-full flex-1 origin-center scale-95 flex-col justify-between rounded-xl p-2 transition-transform duration-300 ease-out hover:scale-100 hover:shadow-lg sm:rounded-2xl sm:p-2.5"
                style={{ backgroundColor: color.hex ?? '#000000' }}
              >
                <SwatchLabels color={color} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
