import { useState, useEffect } from 'react'
import './App.css'
import { cantoneseWords } from './data'
import { Mode } from './types'
import { validateCantoneseJyutping } from './api'

function App() {
  const [mode, setMode] = useState<Mode>('reference')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const currentWord = cantoneseWords[currentIndex]

  useEffect(() => {
    setInput('')
    setIsCorrect(false)
  }, [currentIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsCorrect(false)
  }

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
        setCurrentIndex(prev => (prev + 1) % cantoneseWords.length)
      }, 500)
    } else {
      setTotal(prev => prev + 1)
    }
  }

  const toggleMode = () => {
    setMode(prev => prev === 'reference' ? 'advanced' : 'reference')
    setCurrentIndex(0)
    setScore(0)
    setTotal(0)
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

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
        <div className="word-container">
          <div className="character">{currentWord.character}</div>
          {mode === 'reference' && (
            <div className="jyutping">{currentWord.jyutping}</div>
          )}
          <div className="meaning">{currentWord.meaning}</div>
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="請輸入粵語拼音..."
            className={isCorrect ? 'correct' : ''}
            autoFocus
          />
          <button type="submit">提交</button>
        </form>

        <div className="stats">
          <div>正確率: {accuracy}%</div>
          <div>分數: {score} / {total}</div>
        </div>
      </main>

      <footer className="footer">
        <p>數據參考: <a href="https://jyutping.io/tutorial" target="_blank" rel="noopener noreferrer">粵拼.io</a></p>
      </footer>
    </div>
  )
}

export default App
