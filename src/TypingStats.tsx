interface TypingStatsProps {
  accuracy: number
  score: number
  total: number
}

function TypingStats({ accuracy, score, total }: TypingStatsProps) {
  const speed = total > 0 ? Math.max(1, Math.round((score / Math.max(total, 1)) * 10)) : 0

  return (
    <section className="typing-stats" aria-label="練習統計">
      <div className="stat-item">
        <span className="stat-label">速度</span>
        <span className="stat-value">{speed}字/分</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">正確率</span>
        <span className="stat-value">{accuracy}%</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">分數</span>
        <span className="stat-value">
          {score}/{total}
        </span>
      </div>
    </section>
  )
}

export default TypingStats
