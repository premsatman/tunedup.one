import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function WorkHero() {
  return (
    <BrokenWordHero
      id="work-hero"
      word="work"
      layout="home"
      propSrc="/props/prop-work.png"
      propAlt="TunedUp Mission Sample Container"
      propPosition="center"
      subline={
        <>
          The signals we&apos;ve <HighlightWord>tuned.</HighlightWord>
        </>
      }
    />
  )
}
