import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function HomeHero() {
  return (
    <BrokenWordHero
      id="home-hero"
      word="tunedup"
      wordmarkSrc="/props/herotext.svg"
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp handheld transmitter — STN-A440"
      subline={
        <>
          Your work powers <HighlightWord>ours.</HighlightWord>
        </>
      }
      propPosition="center"
    />
  )
}
