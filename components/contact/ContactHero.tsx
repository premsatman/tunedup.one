import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function ContactHero() {
  return (
    <BrokenWordHero
      id="contact-hero"
      word="contact"
      wordmarkSrc="/props/contact.svg"
      wordmarkWidth={1743}
      wordmarkHeight={332}
      layout="home"
      propSrc="/props/prop-studio.png"
      propAlt="TunedUp Mission Control Drone"
      propPosition="center"
      subline={
        <>
          Initiate First <HighlightWord>Contact</HighlightWord>
        </>
      }
    />
  )
}
