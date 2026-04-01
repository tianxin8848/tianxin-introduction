import type { CantoneseWord } from '../../types'

interface TypingPracticeProps {
  words: CantoneseWord[]
  currentIndex: number
  input: string
  rookieMode?: boolean
}

function TypingPractice({
  words,
  currentIndex,
  input,
  rookieMode = false,
}: TypingPracticeProps) {
  return (
    <section className="typing-practice">
      <article className="typing-line" aria-label="打字練習">
        {words.map((word, index) => {
          const isPast = index < currentIndex
          const isCurrent = index === currentIndex
          const target = word.jyutping
          const typed = isCurrent ? input : ''

          const renderRookieJyutping = () => {
            // 菜鸟模式：灰色底纹显示正确拼音；已输入前缀用小圆角 chip 覆盖
            const prefixLen = Math.min(typed.length, target.length)
            const restStart = prefixLen

            const parts: React.ReactNode[] = []
            for (let i = 0; i < prefixLen; i++) {
              parts.push(
                <span key={`t-${index}-${i}`} className="typing-input-chip">
                  {typed[i]}
                </span>,
              )
            }

            for (let i = restStart; i < target.length; i++) {
              parts.push(
                <span key={`h-${index}-${i}`} className="typing-hint-text">
                  {target[i]}
                </span>,
              )
            }

            if (typed.length > target.length) {
              for (let i = target.length; i < typed.length; i++) {
                parts.push(
                  <span key={`x-${index}-${i}`} className="typing-input-chip">
                    {typed[i]}
                  </span>,
                )
              }
            }

            return parts
          }

          const topText = rookieMode
            ? // 菜鸟模式下非当前字：显示正确拼音（灰色）
              isCurrent
              ? ''
              : word.jyutping
            : // 普通模式：过去显示正确拼音，当前显示输入
              isPast
              ? word.jyutping
              : isCurrent
                ? input
                : ''

          return (
            <div
              key={`${word.character}-${index}`}
              className={`typing-token ${isPast ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="typing-jyutping">
                {rookieMode ? (
                  isCurrent ? (
                    <span className="typing-jyutping-plain">{renderRookieJyutping()}</span>
                  ) : (
                    <span className="typing-hint-text">{topText}</span>
                  )
                ) : (
                  <span className="typing-hint-text">{topText}</span>
                )}
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
