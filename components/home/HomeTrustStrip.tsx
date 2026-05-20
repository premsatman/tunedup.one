import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import MonoLabel from '@/components/shared/MonoLabel'

type TrustLogo = {
  _id: string
  name: string
  logo: Parameters<typeof urlFor>[0]
}

export default function HomeTrustStrip({ logos }: { logos: TrustLogo[] }) {
  if (!logos?.length) return null

  return (
    <section className="border-y border-[var(--line)] pb-16 pt-8 md:py-16">
      <div className="page-gutter flex flex-col gap-8 md:flex-row md:items-center">
        <MonoLabel>Trusted by crew across</MonoLabel>
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-70">
          {logos.map((logo) => (
            <div key={logo._id} className="relative h-8 w-24">
              <Image
                src={urlFor(logo.logo).width(200).url()}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
