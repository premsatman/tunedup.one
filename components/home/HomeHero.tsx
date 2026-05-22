import BrokenWordHero from '@/components/shared/BrokenWordHero'

export default function HomeHero() {
  return (
    <BrokenWordHero
      word="tunedup"
      wordmarkSrc="/props/herotext.svg"
      layout="home"
      propSrc="/props/prop-hero.png"
      propAlt="TunedUp handheld transmitter — STN-A440"
      subline={
        <>
          <span className="block">Your mission powers</span>
          <span className="block">our mission.</span>
        </>
      }
      propPosition="center"
    />
  )
}
