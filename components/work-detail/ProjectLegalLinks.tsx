import Pill from '@/components/shared/Pill'

const projectLegalLinks: Record<string, { privacy: string; terms: string }> = {
  'jelc-church-app': {
    privacy: '/work/jelc-church-app/privacy',
    terms: '/work/jelc-church-app/terms',
  },
}

export default function ProjectLegalLinks({ slug }: { slug: string }) {
  const links = projectLegalLinks[slug]
  if (!links) return null

  return (
    <section
      aria-label="App policies"
      className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-16 sm:px-6 lg:px-12 lg:pb-20"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-white/50">App policies</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Pill href={links.privacy} theme="dark" variant="outline">
          Privacy policy
        </Pill>
        <Pill href={links.terms} theme="dark" variant="outline">
          Terms & conditions
        </Pill>
      </div>
    </section>
  )
}
