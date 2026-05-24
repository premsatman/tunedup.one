import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { hasSanityImage } from '@/lib/sanity/hasSanityImage'
import WorkDetailIntro, { workDetailIntroBodyClassName } from '@/components/work-detail/WorkDetailIntro'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import type { SanityImage } from '@/lib/types/mission'

const StyleGuideCard = ({ image }: { image: SanityImage }) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
    <Image
      src={urlFor(image).width(1600).url()}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-contain object-center"
    />
  </div>
)

export default function TheSystem({
  typographyImage,
  componentsImage,
  mockupPair,
  wireframes,
}: {
  typographyImage?: SanityImage
  componentsImage?: SanityImage
  mockupPair?: SanityImage[]
  wireframes?: SanityImage[]
}) {
  const hasTypography = hasSanityImage(typographyImage)
  const hasComponents = hasSanityImage(componentsImage)
  const mockupImages = mockupPair?.filter((image) => hasSanityImage(image)) ?? []
  const wireframeImages = wireframes?.filter((image) => hasSanityImage(image)) ?? []

  const hasStyleGuide = hasTypography || hasComponents

  if (!hasStyleGuide && mockupImages.length === 0 && wireframeImages.length === 0) {
    return null
  }

  return (
    <>
      <WorkDetailIntro title="The System We Built" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
        <p className={workDetailIntroBodyClassName}>Style guide, components, screens.</p>
      </WorkDetailIntro>

      {hasStyleGuide && (
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-12 lg:pb-20">
            <div
              className={`mx-auto grid w-full gap-5 lg:max-w-4xl xl:max-w-[52rem] ${
                hasTypography && hasComponents ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {hasTypography && typographyImage && <StyleGuideCard image={typographyImage} />}
              {hasComponents && componentsImage && <StyleGuideCard image={componentsImage} />}
            </div>
          </section>
      )}

      {mockupImages.length > 0 && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div
              className={`mx-auto grid w-full gap-4 lg:max-w-4xl xl:max-w-[52rem] ${
                mockupImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {mockupImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-[var(--canvas)]"
                >
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {wireframeImages.length > 0 && (
        <ContainerSection>
          <MonoLabel className="mb-4 block">/ Wireframe & UI Design</MonoLabel>
          <h3 className="mb-12 font-display text-2xl font-bold md:text-3xl">From sketch to ship.</h3>

          <div
            className={`grid gap-4 ${
              wireframeImages.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : wireframeImages.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1'
            }`}
          >
            {wireframeImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--canvas)]"
              >
                <Image
                  src={urlFor(img).width(1000).url()}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </ContainerSection>
      )}
    </>
  )
}
