import type { LyricToken } from './types'

interface LyricsPracticeProps {
  tokens: LyricToken[]
  currentIndex: number
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

function LyricsPractice({
  tokens,
  currentIndex,
  input,
  onInputChange,
  onSubmit,
}: LyricsPracticeProps) {
  return (
    <section className="lyrics-practice">
      <form className="typing-input-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="輸入當前字嘅拼音後按 Enter"
          autoFocus
        />
      </form>

      <article className="lyrics-line" aria-label="歌詞打字">
        {tokens.map((token, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex
          const topText = token.isPunctuation ? '' : isPast ? token.jyutping : isCurrent ? input : ''
          return (
            <div
              key={`${token.character}-${index}`}
              className={`lyrics-token ${isPast ? 'done' : ''} ${isCurrent ? 'current' : ''} ${token.isPunctuation ? 'punct' : ''}`}
            >
              <div className="lyrics-jyutping">{topText}</div>
              <span className="lyrics-char">{token.character}</span>
            </div>
          )
        })}
      </article>
    </section>
  )
}

export default LyricsPractice
