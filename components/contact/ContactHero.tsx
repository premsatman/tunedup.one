import BrokenWordHero from '@/components/shared/BrokenWordHero'
import HighlightWord from '@/components/shared/HighlightWord'

export default function ContactHero() {
  return (
    <BrokenWordHero
      word="contact"
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp Comms Handset"
      sublineClassName="text-title-hero-contact relative z-0 m-0 mt-4 max-w-3xl text-[var(--ink)] md:mt-5"
      subline={
        <>
          Start a conversation <br /> about{' '}
          <HighlightWord>new work,</HighlightWord>
          <br />
          careers, or anything else.
        </>
      }
    />
  )
}
