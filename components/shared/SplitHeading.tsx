import HighlightWord from '@/components/shared/HighlightWord'

type SplitHeadingProps = {
  before: string
  highlight: string
  after?: string
}

const SplitHeading = ({ before, highlight, after }: SplitHeadingProps) => {
  const trimmedHighlight = highlight.trim()
  const trimmedAfter = after?.trim()

  return (
    <>
      {before.trimEnd()}
      {trimmedHighlight ? (
        <>
          {' '}
          <HighlightWord>{trimmedHighlight}</HighlightWord>
        </>
      ) : null}
      {trimmedAfter ? (
        <>
          {' '}
          {trimmedAfter}
        </>
      ) : null}
    </>
  )
}

export default SplitHeading
