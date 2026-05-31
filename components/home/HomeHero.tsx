import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'
import { brandAlt, brandAssets, brandLogoDimensions } from '@/lib/brand'

const HOME_TUNEDUP_WORDMARK_CLASS =
  'block h-[clamp(96px,24vw,168px)] w-auto max-w-full origin-bottom-left sm:h-[clamp(168px,20vw,264px)] lg:h-[clamp(264px,18vw,580px)]'

const HOME_SUBLINE_CLASS =
  'text-title-hero-intro relative z-0 m-0 -mt-[20px] max-w-3xl leading-none text-[var(--ink)]'

export default function HomeHero() {
  return (
    <BrokenWordHero
      id="home-hero"
      word={brandAlt}
      wordmarkSrc={brandAssets.fullBlack}
      wordmarkWidth={brandLogoDimensions.full.width}
      wordmarkHeight={brandLogoDimensions.full.height}
      wordmarkClassName={HOME_TUNEDUP_WORDMARK_CLASS}
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp handheld transmitter — STN-A440"
      propPosition="center"
      sublineClassName={HOME_SUBLINE_CLASS}
      subline={
        <>
          Your work powers <HighlightWord>ours.</HighlightWord>
        </>
      }
    />
  )
}
