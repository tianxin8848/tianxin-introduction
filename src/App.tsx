import { useState } from 'react'
import './App.css'
import { cantoneseWords } from './data'
import type { Mode } from './types'
import { validateCantoneseJyutping } from './api'
import ReferenceSections from './ReferenceSections'
import TypingStats from './TypingStats'
import TypingPractice from './TypingPractice'

function App() {
  const [mode, setMode] = useState<Mode>('reference')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const currentWord = cantoneseWords[currentIndex]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 本地验证
    const isLocalCorrect = input === currentWord.jyutping
    
    // 调用 DeepSeek API 验证
    const isApiCorrect = await validateCantoneseJyutping(currentWord.character, input)
    
    // 综合验证结果
    const isCorrectResult = isLocalCorrect && isApiCorrect
    
    if (isCorrectResult) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
      setTotal(prev => prev + 1)
      setTimeout(() => {
        setInput('')
        setIsCorrect(false)
        setCurrentIndex(prev => (prev + 1) % cantoneseWords.length)
      }, 500)
    } else {
      setTotal(prev => prev + 1)
    }
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0
  const totalWords = cantoneseWords.length
  const progressPercent = Math.round(((currentIndex + 1) / totalWords) * 100)

  return (
    <div className="app">
      <header className="header">
        <h1>粵語拼音打字練習</h1>
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'reference' ? 'active' : ''}`}
            onClick={() => setMode('reference')}
          >
            參考模式
          </button>
          <button 
            className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
            onClick={() => setMode('advanced')}
          >
            進階模式
          </button>
        </div>
      </header>

      <main className="main">
        <div className="progress-card">
          <div className="progress-header">
            <span>練習進度</span>
            <span>{currentIndex + 1} / {totalWords}</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-percent">{progressPercent}%</div>
        </div>

        <TypingStats accuracy={accuracy} score={score} total={total} />
        <TypingPractice
          currentWord={currentWord}
          mode={mode}
          input={input}
          isCorrect={isCorrect}
          onInputChange={(value) => {
            setInput(value)
            setIsCorrect(false)
          }}
          onSubmit={handleSubmit}
        />

        <ReferenceSections />
      </main>

      <footer className="footer">
        <p>數據參考: <a href="https://jyutping.io/tutorial" target="_blank" rel="noopener noreferrer">粵拼.io</a></p>
      </footer>
    </div>
  )
}

export default App
