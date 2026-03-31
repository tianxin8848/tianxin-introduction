import type { LyricToken } from './types'

interface LyricsPracticeProps {
  tokens: LyricToken[]
  currentIndex: number
  input: string
  rookieMode: boolean
}

function LyricsPractice({
  tokens,
  currentIndex,
  input,
  rookieMode,
}: LyricsPracticeProps) {
  return (
    <section className="lyrics-practice">
      <article className="lyrics-line" aria-label="歌詞打字">
        {tokens.map((token, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex
          const topHint = token.isPunctuation ? '' : rookieMode ? token.jyutping : isPast ? token.jyutping : ''
          const inputChars = isCurrent ? input.split('') : []
          return (
            <div
              key={`${token.character}-${index}`}
              className={`lyrics-token ${isPast ? 'done' : ''} ${isCurrent ? 'current' : ''} ${token.isPunctuation ? 'punct' : ''}`}
            >
              <div className="lyrics-jyutping">
                <span className="lyrics-hint">{topHint}</span>
                {isCurrent && inputChars.length > 0 && (
                  <span className="lyrics-input-boxes" aria-label="當前輸入">
                    {inputChars.map((char, charIndex) => (
                      <span key={`${char}-${charIndex}`} className="lyrics-input-box">
                        {char}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <span className="lyrics-char">{token.character}</span>
            </div>
          )
        })}
      </article>
    </section>
  )
}

export default LyricsPractice
