interface ProgressCardProps {
  currentProgress: number;
  totalWords: number;
  progressPercent: number;
}

function ProgressCard({ currentProgress, totalWords, progressPercent }: ProgressCardProps) {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <span>練習進度</span>
        <span>{currentProgress} / {totalWords}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="progress-percent">{progressPercent}%</div>
    </div>
  )
}

export default ProgressCard