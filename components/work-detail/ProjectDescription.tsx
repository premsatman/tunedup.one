import Image from 'next/image'
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'
import WorkDetailIntro, { workDetailIntroBodyClassName } from '@/components/work-detail/WorkDetailIntro'
import type { SanityImage } from '@/lib/types/mission'

const heroPtComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={workDetailIntroBodyClassName}>{children}</p>
    ),
  },
}

export const ProjectDescriptionIntro = ({
  description,
}: {
  description?: PortableTextBlock[]
}) => {
  if (!description) return null

  return (
    <WorkDetailIntro title="Project Description">
      <PortableText value={description} components={heroPtComponents} />
    </WorkDetailIntro>
  )
}

export const HeroImage2 = ({ image }: { image?: SanityImage }) => {
  if (!image) return null

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 lg:pb-16">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.25rem] lg:aspect-[21/9]">
        <Image
          src={urlFor(image).width(2400).url()}
          alt=""
          fill
          sizes="(max-width: 1280px) calc(100vw - 3rem), min(1280px, calc(100vw - 6rem))"
          className="object-cover"
        />
      </div>
    </div>
  )
}
