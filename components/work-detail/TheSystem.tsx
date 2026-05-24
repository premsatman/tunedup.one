import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import ContainerSection from '@/components/shared/ContainerSection'
import MonoLabel from '@/components/shared/MonoLabel'
import type { SanityImage } from '@/lib/types/mission'

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
  if (!typographyImage) return null

  return (
    <>
      <ContainerSection>
        <MonoLabel className="block mb-4">/ The System We Built</MonoLabel>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl mb-12">
          Style guide, components, screens.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-[var(--line)] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[var(--line)]">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                /Typography
              </div>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src={urlFor(typographyImage).width(1200).url()}
                alt="Typography showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {componentsImage && (
            <div className="bg-white border border-[var(--line)] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[var(--line)]">
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                  /Components
                </div>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={urlFor(componentsImage).width(1200).url()}
                  alt="Component showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </ContainerSection>

      {mockupPair?.length === 2 && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 gap-4">
              {mockupPair.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
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

      {wireframes?.length === 3 && (
        <ContainerSection>
          <MonoLabel className="block mb-4">/ Wireframe & UI Design</MonoLabel>
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-12">
            From sketch to ship.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wireframes.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--canvas)] border border-[var(--line)]"
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
