import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function HomeHero() {
  return (
    <BrokenWordHero
      word="tunedup"
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp handheld transmitter — STN-A440"
      subline={
        <>
          Every mission has a <HighlightWord>frequency.</HighlightWord> We help yours carry.
        </>
      }
      propPosition="center"
    />
  )
}
