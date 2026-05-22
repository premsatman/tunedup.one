import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function ContactHero() {
  return (
    <BrokenWordHero
      word="contact"
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp Comms Handset"
      subline={
        <>
          Start a conversation about{' '}
          <HighlightWord>new work,</HighlightWord>
          <br />
          careers, or anything else.
        </>
      }
    />
  )
}
