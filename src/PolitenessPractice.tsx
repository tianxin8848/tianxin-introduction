import type { PolitenessPhrase } from './types'

interface PolitenessPracticeProps {
  currentPhrase: PolitenessPhrase
  input: string
  isCorrect: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

function PolitenessPractice({
  currentPhrase,
  input,
  isCorrect,
  onInputChange,
  onSubmit
}: PolitenessPracticeProps) {
  return (
    <section className="politeness-practice">
      <form onSubmit={onSubmit} className="typing-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="請輸入粵語拼音..."
          className={isCorrect ? 'correct' : ''}
          autoFocus
        />
        <div className="reference-answer">提示：{currentPhrase.jyutping}</div>
      </form>

      <div className="politeness-phrase-wrap">
        <div className="politeness-character">{currentPhrase.character}</div>
        <div className="politeness-meaning">{currentPhrase.meaning}</div>
        <div className="politeness-category">
          <span className="category-label">分類：</span>
          <span className="category-value">{currentPhrase.category}</span>
        </div>
      </div>
    </section>
  )
}

export default PolitenessPractice