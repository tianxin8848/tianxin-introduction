import type { CantoneseWord } from '../../types'
import './TypingPractice.css'

interface TypingPracticeProps {
  words: CantoneseWord[]
  currentIndex: number
  input: string
  rookieMode?: boolean
  isCorrect?: boolean
}

function TypingPractice({
  words,
  currentIndex,
  input,
  rookieMode = false,
  isCorrect = false,
}: TypingPracticeProps) {
  // 参考模式（rookieMode）下：只渲染当前附近的一小段，避免一次性渲染过多 DOM。
  const referenceWindowSize = 50
  const startIndex = rookieMode
    ? Math.max(0, currentIndex - Math.floor(referenceWindowSize / 2))
    : 0
  const endIndex = rookieMode
    ? Math.min(words.length, startIndex + referenceWindowSize)
    : words.length
  const visibleWords = rookieMode ? words.slice(startIndex, endIndex) : words

  return (
    <section className="typing-practice">
      <article className="typing-line" aria-label="打字練習">
        {visibleWords.map((word, indexWithinWindow) => {
          const absoluteIndex = rookieMode ? startIndex + indexWithinWindow : indexWithinWindow

          const isPast = absoluteIndex < currentIndex
          const isCurrent = absoluteIndex === currentIndex
          const target = word.jyutping
          // 在“刚刚答对”的过渡期（App 里延迟 nextWord()）input 会被清空，
          // 如果这里直接用空 input 渲染，会造成当前字闪一下再变空。
          // 因此在过渡期用目标拼音替代 input，保持当前字显示为“已完成状态”。
          const displayInput = isCurrent && isCorrect ? target : input
          const typed = isCurrent ? displayInput : ''

          const renderRookieJyutping = () => {
            // 菜鸟模式：灰色底纹显示正确拼音；已输入前缀用小圆角 chip 覆盖
            const prefixLen = Math.min(typed.length, target.length)
            const restStart = prefixLen

            const parts: React.ReactNode[] = []
            for (let i = 0; i < prefixLen; i++) {
              parts.push(
                <span
                  key={`t-${absoluteIndex}-${i}`}
                  className="typing-input-chip"
                >
                  {typed[i]}
                </span>,
              )
            }

            for (let i = restStart; i < target.length; i++) {
              parts.push(
                <span
                  key={`h-${absoluteIndex}-${i}`}
                  className="typing-hint-text"
                >
                  {target[i]}
                </span>,
              )
            }

            if (typed.length > target.length) {
              for (let i = target.length; i < typed.length; i++) {
                parts.push(
                  <span
                    key={`x-${absoluteIndex}-${i}`}
                    className="typing-input-chip"
                  >
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
                ? displayInput
                : ''

          return (
            <div
              key={`${word.character}-${absoluteIndex}`}
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
