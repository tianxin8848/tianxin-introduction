import type { LyricToken } from './types'

interface LyricsPracticeProps {
  tokens: LyricToken[]
  currentIndex: number
  input: string
  rookieMode: boolean
  segmentSize?: number
  currentSegment?: number
}

function LyricsPractice({
  tokens,
  currentIndex,
  input,
  rookieMode,
  segmentSize = 50,
  currentSegment = 0,
}: LyricsPracticeProps) {
  // 计算当前显示的tokens段
  const getCurrentSegmentTokens = () => {
    if (segmentSize <= 0) return tokens
    
    const startIndex = currentSegment * segmentSize
    const endIndex = Math.min(startIndex + segmentSize, tokens.length)
    return tokens.slice(startIndex, endIndex)
  }
  
  // 获取当前段落的tokens
  const currentTokens = getCurrentSegmentTokens()
  
  // 计算总段数
  const totalSegments = segmentSize > 0 ? Math.ceil(tokens.length / segmentSize) : 1
  
  return (
    <section className="lyrics-practice">
      {/* 分段导航（如果有多段） */}
      {totalSegments > 1 && (
        <div className="lyrics-segment-nav">
          <span className="lyrics-segment-info">
            段落 {currentSegment + 1} / {totalSegments}
          </span>
        </div>
      )}
      
      <article className="lyrics-line" aria-label="歌詞打字">
        {currentTokens.map((token, segmentIndex) => {
          const absoluteIndex = currentSegment * segmentSize + segmentIndex
          const isPast = absoluteIndex < currentIndex
          const isCurrent = absoluteIndex === currentIndex
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
                <span key={`t-${absoluteIndex}-${i}`} className="lyrics-input-chip">
                  {typed[i]}
                </span>,
              )
            }

            for (let i = restStart; i < target.length; i++) {
              parts.push(
                <span key={`h-${absoluteIndex}-${i}`} className="lyrics-hint-text">
                  {target[i]}
                </span>,
              )
            }

            if (typed.length > target.length) {
              for (let i = target.length; i < typed.length; i++) {
                parts.push(
                  <span key={`x-${absoluteIndex}-${i}`} className="lyrics-input-chip">
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
              key={`${token.character}-${absoluteIndex}`}
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
      
      {/* 分段进度指示器 */}
      {totalSegments > 1 && (
        <div className="lyrics-segment-progress">
          {Array.from({ length: totalSegments }).map((_, idx) => (
            <div
              key={`segment-${idx}`}
              className={`lyrics-segment-dot ${idx === currentSegment ? 'active' : ''}`}
              title={`段落 ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default LyricsPractice