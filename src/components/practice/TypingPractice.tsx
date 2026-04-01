import type { CantoneseWord } from '../../types'

interface TypingPracticeProps {
  words: CantoneseWord[]
  currentIndex: number
  input: string
}

function TypingPractice({
  words,
  currentIndex,
  input,
}: TypingPracticeProps) {
  return (
    <section className="typing-practice">
      <article className="typing-line" aria-label="打字練習">
        {words.map((word, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex

          return (
            <div
              key={`${word.character}-${index}`}
              className={`typing-token ${isPast ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="typing-jyutping">
                <span className="typing-hint-text">
                  {isPast
                    ? word.jyutping
                    : isCurrent
                    ? input
                    : ''}
                </span>
              </div>
              <span className="typing-character">{word.character}</span>
              <div className="typing-meaning">{word.meaning}</div>
            </div>
          )
        })}
      </article>
    </section>
  )
}

export default TypingPractice
