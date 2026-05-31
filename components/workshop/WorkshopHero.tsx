import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function WorkshopHero() {
  return (
    <BrokenWordHero
      id="crew-hero"
      word="crew"
      wordmarkSrc="/props/crew.svg"
      wordmarkWidth={1031}
      wordmarkHeight={262}
      layout="home"
      propSrc="/props/prop-helmet.png"
      propAlt="TunedUp Crew Helmet — STN-A440"
      propPosition="center"
      subline={
        <>
          We thrive on <HighlightWord>resonance.</HighlightWord>
        </>
      }
    />
  )
}
