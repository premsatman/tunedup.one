import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import MockupMediaGlow from '@/components/work-detail/MockupMediaGlow'
import type { SanityImage } from '@/lib/types/mission'

const mockupFrameClassName =
  'relative overflow-hidden rounded-2xl bg-white/[0.04]'

const mockupGridWrapClassName = 'mx-auto w-full lg:max-w-4xl xl:max-w-[52rem]'

const PairMockup = ({ image, sizes }: { image: SanityImage; sizes: string }) => (
  <div className={`${mockupFrameClassName} aspect-[9/16]`}>
    <Image
      src={urlFor(image).width(800).url()}
      alt=""
      fill
      sizes={sizes}
      className="object-cover"
    />
  </div>
)

const SingleMockup = ({
  image,
  glowColor,
}: {
  image: SanityImage
  glowColor?: string
}) => (
  <div className="relative isolate py-6 sm:py-8">
    {glowColor ? <MockupMediaGlow color={glowColor} /> : null}
    <div className={`${mockupFrameClassName} relative z-10 aspect-[16/9]`}>
      <Image
        src={urlFor(image).width(2400).url()}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 832px"
        className="object-cover"
      />
    </div>
  </div>
)

type WorkDetailMockupGridProps = {
  mockups?: SanityImage[]
  mockupSingle?: SanityImage
  singleGlowColor?: string
}

export default function WorkDetailMockupGrid({
  mockups,
  mockupSingle,
  singleGlowColor,
}: WorkDetailMockupGridProps) {
  const pairLeft = hasSanityImage(mockups?.[0]) ? mockups![0] : undefined
  const pairRight = hasSanityImage(mockups?.[1]) ? mockups![1] : undefined
  const single = hasSanityImage(mockupSingle) ? mockupSingle : undefined
  const hasSingle = Boolean(single)
  const pairOnly = [pairLeft, pairRight].filter(Boolean) as SanityImage[]

  if (pairOnly.length === 0 && !hasSingle) return null

  if (!hasSingle) {
    return (
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className={mockupGridWrapClassName}>
            <div
              className={`grid gap-4 lg:gap-5 ${
                pairOnly.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {pairOnly.map((img, i) => (
                <PairMockup key={i} image={img} sizes="(max-width: 1024px) 50vw, 320px" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className={mockupGridWrapClassName}>
          <div className="flex flex-col gap-4 lg:hidden">
            {pairLeft && <PairMockup image={pairLeft} sizes="100vw" />}
            {single && <SingleMockup image={single} glowColor={singleGlowColor} />}
            {pairRight && <PairMockup image={pairRight} sizes="100vw" />}
          </div>

          <div className="hidden gap-5 lg:grid lg:grid-cols-2">
            {pairLeft && (
              <div className="lg:order-1">
                <PairMockup image={pairLeft} sizes="320px" />
              </div>
            )}

            {pairRight && (
              <div className="lg:order-2">
                <PairMockup image={pairRight} sizes="320px" />
              </div>
            )}

            {single && (
              <div className="col-span-2 lg:order-3">
                <SingleMockup image={single} glowColor={singleGlowColor} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
