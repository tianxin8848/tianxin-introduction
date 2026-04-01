import { useEffect } from 'react'
import type { PolitenessPhrase } from '../../types'
import { politenessPhrases } from '../../data/politenessData'

interface PolitenessPracticeProps {
  currentPhrase: PolitenessPhrase | undefined
  input: string
  isCorrect: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function PolitenessPractice({
  currentPhrase,
  input,
  isCorrect,
  onInputChange,
  onSubmit
}: PolitenessPracticeProps) {
  useEffect(() => {
    if (isCorrect) {
      onInputChange('')
    }
  }, [isCorrect, onInputChange])

  if (!currentPhrase) return null

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

      <section className="all-politeness-phrases">
        <h3>所有礼貌用语</h3>
        <div className="phrases-grid">
          {politenessPhrases.map((phrase, index) => (
            <div key={index} className="phrase-item">
              <span className="phrase-character">{phrase.character}</span>
              <span className="phrase-jyutping">{phrase.jyutping}</span>
              <span className="phrase-meaning">{phrase.meaning}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default PolitenessPractice
