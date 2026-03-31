import type { CantoneseWord, Mode } from '../../types'

interface TypingPracticeProps {
  currentWord: CantoneseWord
  mode: Mode
  input: string
  isCorrect: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function TypingPractice({
  currentWord,
  mode,
  input,
  isCorrect,
  onInputChange,
  onSubmit,
}: TypingPracticeProps) {
  return (
    <section className="typing-practice">
      <form onSubmit={onSubmit} className="typing-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="請輸入粵語拼音..."
          className={isCorrect ? 'correct' : ''}
          autoFocus
        />
        {mode === 'reference' && (
          <div className="reference-answer">提示：{currentWord.jyutping}</div>
        )}
      </form>

      <div className="typing-character-wrap">
        <div className="typing-character">{currentWord.character}</div>
        <div className="typing-meaning">{currentWord.meaning}</div>
      </div>
    </section>
  )
}

export default TypingPractice
