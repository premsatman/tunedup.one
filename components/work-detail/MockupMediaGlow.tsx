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
      background: `radial-gradient(ellipse at center, ${color} 0%, transparent 72%)`,
      opacity,
    }}
  />
)

export default function MockupMediaGlow({ color }: MockupMediaGlowProps) {
  return (
    <>
      <MobileGlowBand
        color={color}
        positionClassName="top-[6%]"
        insetClassName="inset-x-[6%]"
        heightClassName="h-20"
        opacity={0.45}
      />
      <MobileGlowBand
        color={color}
        positionClassName="top-[72%]"
        insetClassName="inset-x-[6%]"
        heightClassName="h-24"
        opacity={0.5}
      />

      <div className="hidden lg:contents">
        <GlowLayer
          color={color}
          positionClassName="top-[6%] sm:top-[8%]"
          sizeClassName="h-28 sm:h-32 md:h-36"
          insetClassName="inset-x-[4%] sm:inset-x-[6%]"
          opacityClassName="opacity-50"
          blurClassName="blur-3xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[12%] sm:top-[14%]"
          sizeClassName="h-20 sm:h-24"
          insetClassName="inset-x-[10%]"
          opacityClassName="opacity-75"
          blurClassName="blur-2xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[18%] sm:top-[20%]"
          sizeClassName="h-12 sm:h-14"
          insetClassName="inset-x-[18%]"
          opacityClassName="opacity-85"
          blurClassName="blur-xl"
        />

        <GlowLayer
          color={color}
          positionClassName="top-[72%] md:top-[74%]"
          sizeClassName="h-28 sm:h-32 md:h-36"
          insetClassName="inset-x-[4%] sm:inset-x-[6%]"
          opacityClassName="opacity-50"
          blurClassName="blur-3xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[78%] sm:top-[80%]"
          sizeClassName="h-20 sm:h-24"
          insetClassName="inset-x-[10%]"
          opacityClassName="opacity-75"
          blurClassName="blur-2xl"
        />
        <GlowLayer
          color={color}
          positionClassName="top-[82%] sm:top-[84%]"
          sizeClassName="h-12 sm:h-14"
          insetClassName="inset-x-[18%]"
          opacityClassName="opacity-85"
          blurClassName="blur-xl"
        />
      </div>
    </>
  )
}
