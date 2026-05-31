type MockupMediaGlowProps = {
  color: string
}

const GlowLayer = ({
  color,
  positionClassName,
  sizeClassName,
  insetClassName,
  opacityClassName,
  blurClassName,
}: {
  color: string
  positionClassName: string
  sizeClassName: string
  insetClassName: string
  opacityClassName: string
  blurClassName: string
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute z-0 rounded-[100%] ${positionClassName} ${sizeClassName} ${insetClassName} ${opacityClassName} ${blurClassName}`}
    style={{ backgroundColor: color }}
  />
)

const MobileGlowBand = ({
  color,
  positionClassName,
  insetClassName,
  heightClassName,
  opacity,
}: {
  color: string
  positionClassName: string
  insetClassName: string
  heightClassName: string
  opacity: number
}) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute z-0 ${positionClassName} ${insetClassName} ${heightClassName} lg:hidden`}
    style={{
      background: `radial-gradient(ellipse at center, ${color} 0%, transparent 68%)`,
      opacity,
    }}
  />
)

export default function MockupMediaGlow({ color }: MockupMediaGlowProps) {
  return (
    <>
      <MobileGlowBand
        color={color}
        positionClassName="top-[8%]"
        insetClassName="inset-x-[14%]"
        heightClassName="h-14"
        opacity={0.42}
      />
      <MobileGlowBand
        color={color}
        positionClassName="top-[76%]"
        insetClassName="inset-x-[14%]"
        heightClassName="h-16"
        opacity={0.48}
      />

      <div className="hidden lg:contents">
        <GlowLayer
          color={color}
          positionClassName="top-[8%] sm:top-[9%]"
          sizeClassName="h-16 sm:h-[4.5rem]"
          insetClassName="inset-x-[12%] sm:inset-x-[14%]"
          opacityClassName="opacity-45"
          blurClassName="blur-2xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[13%] sm:top-[14%]"
          sizeClassName="h-11 sm:h-12"
          insetClassName="inset-x-[18%]"
          opacityClassName="opacity-70"
          blurClassName="blur-xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[18%] sm:top-[19%]"
          sizeClassName="h-7 sm:h-8"
          insetClassName="inset-x-[24%]"
          opacityClassName="opacity-80"
          blurClassName="blur-lg"
        />

        <GlowLayer
          color={color}
          positionClassName="top-[76%] md:top-[77%]"
          sizeClassName="h-16 sm:h-[4.5rem]"
          insetClassName="inset-x-[12%] sm:inset-x-[14%]"
          opacityClassName="opacity-45"
          blurClassName="blur-2xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[80%] sm:top-[81%]"
          sizeClassName="h-11 sm:h-12"
          insetClassName="inset-x-[18%]"
          opacityClassName="opacity-70"
          blurClassName="blur-xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[84%] sm:top-[85%]"
          sizeClassName="h-7 sm:h-8"
          insetClassName="inset-x-[24%]"
          opacityClassName="opacity-80"
          blurClassName="blur-lg"
        />
      </div>
    </>
  )
}
