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
          const target = token.isPunctuation ? '' : token.jyutping
          const typed = isCurrent ? input : ''

          const renderRookieJyutping = () => {
            if (token.isPunctuation) return null

            // 菜鸟模式：灰色底纹显示正确拼音；已输入前缀用小圆角 chip 覆盖（不再使用固定方块输入框）。
            const prefixLen = Math.min(typed.length, target.length)
            const restStart = prefixLen

            const parts: React.ReactNode[] = []
            for (let i = 0; i < prefixLen; i++) {
              parts.push(
                <span key={`t-${index}-${i}`} className="lyrics-input-chip">
                  {typed[i]}
                </span>,
              )
            }

            for (let i = restStart; i < target.length; i++) {
              parts.push(
                <span key={`h-${index}-${i}`} className="lyrics-hint-text">
                  {target[i]}
                </span>,
              )
            }

            if (typed.length > target.length) {
              for (let i = target.length; i < typed.length; i++) {
                parts.push(
                  <span key={`x-${index}-${i}`} className="lyrics-input-chip">
                    {typed[i]}
                  </span>,
                )
              }
            }

            return parts
          }

          const topText = token.isPunctuation
            ? ''
            : rookieMode
              ? // 菜鸟模式下非当前字：显示正确拼音（灰色）
                isCurrent
                ? ''
                : token.jyutping
              : // 普通模式：过去显示正确拼音，当前显示输入
                isPast
                ? token.jyutping
                : isCurrent
                  ? input
                  : ''
          return (
            <div
              key={`${token.character}-${index}`}
              className={`lyrics-token ${isPast ? 'done' : ''} ${isCurrent ? 'current' : ''} ${token.isPunctuation ? 'punct' : ''}`}
            >
              <div className="lyrics-jyutping">
                {rookieMode ? (
                  isCurrent ? (
                    <span className="lyrics-jyutping-plain">{renderRookieJyutping()}</span>
                  ) : (
                    <span className="lyrics-hint-text">{topText}</span>
                  )
                ) : (
                  <span className="lyrics-hint-text">{topText}</span>
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
