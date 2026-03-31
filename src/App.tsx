import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import type { CantoneseWord, Mode } from './types'
import { fetchTrainingWordsByFinal } from './api'
import ReferenceSections from './ReferenceSections'
import TypingStats from './TypingStats'
import TypingPractice from './TypingPractice'
import { isJyutpingFinal } from './finals'
import LyricsPractice from './LyricsPractice'
import { lyricTokens } from './lyricsData'

function App() {
  const { final = 'aa' } = useParams()
  const selectedFinal = useMemo(() => (isJyutpingFinal(final) ? final : 'aa'), [final])

  const [mode, setMode] = useState<Mode>('reference')
  const [trainingWords, setTrainingWords] = useState<CantoneseWord[]>([])
  const [isLoadingWords, setIsLoadingWords] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lyricIndex, setLyricIndex] = useState(0)
  const [lyricsRookieMode, setLyricsRookieMode] = useState(true)
  const [input, setInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const currentWord = trainingWords[currentIndex]
  const currentLyricToken = lyricTokens[lyricIndex]
  const isLyricsMode = mode === 'lyrics'

  const submitLyricsInput = useCallback(() => {
    if (!currentLyricToken || currentLyricToken.isPunctuation) return
    const normalizedInput = input.trim().toLowerCase()
    const isMatched = normalizedInput === currentLyricToken.jyutping.toLowerCase()
    setTotal(prev => prev + 1)
    if (!isMatched) return

    setScore(prev => prev + 1)
    setInput('')
    setIsCorrect(false)
    let nextIndex = lyricIndex + 1
    while (nextIndex < lyricTokens.length && lyricTokens[nextIndex].isPunctuation) {
      nextIndex += 1
    }
    setLyricIndex(nextIndex >= lyricTokens.length ? 0 : nextIndex)
  }, [currentLyricToken, input, lyricIndex])

  useEffect(() => {
    let cancelled = false

    const loadWords = async () => {
      setIsLoadingWords(true)
      const words = await fetchTrainingWordsByFinal(selectedFinal)
      if (cancelled) return
      setTrainingWords(words)
      setCurrentIndex(0)
      setLyricIndex(0)
      setInput('')
      setIsCorrect(false)
      setScore(0)
      setTotal(0)
      setIsLoadingWords(false)
    }

    loadWords()

    return () => {
      cancelled = true
    }
  }, [selectedFinal])

  useEffect(() => {
    if (!isLyricsMode) return

    const handleLyricsKeydown = (event: KeyboardEvent) => {
      const key = event.key
      if (key === 'Enter') {
        event.preventDefault()
        submitLyricsInput()
        return
      }
      if (key === 'Backspace') {
        event.preventDefault()
        setInput((prev) => prev.slice(0, -1))
        return
      }
      if (/^[a-zA-Z0-9]$/.test(key)) {
        event.preventDefault()
        setInput((prev) => `${prev}${key.toLowerCase()}`)
      }
    }

    window.addEventListener('keydown', handleLyricsKeydown)
    return () => window.removeEventListener('keydown', handleLyricsKeydown)
  }, [isLyricsMode, submitLyricsInput])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLyricsMode) {
      submitLyricsInput()
      return
    }

    if (!currentWord) return

    const normalizedInput = input.trim().toLowerCase()
    const isMatched = normalizedInput === currentWord.jyutping.toLowerCase()

    if (isMatched) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
      setTotal(prev => prev + 1)
      setTimeout(() => {
        setInput('')
        setIsCorrect(false)
        setCurrentIndex(prev => (prev + 1) % trainingWords.length)
      }, 500)
    } else {
      setTotal(prev => prev + 1)
    }
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0
  const totalWords = isLyricsMode ? lyricTokens.filter((token) => !token.isPunctuation).length : trainingWords.length
  const progressBase = isLyricsMode
    ? lyricTokens.slice(0, lyricIndex + 1).filter((token) => !token.isPunctuation).length
    : currentIndex + 1
  const progressPercent = totalWords > 0 ? Math.round((progressBase / totalWords) * 100) : 0
  const currentProgress = totalWords > 0 ? progressBase : 0

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode)
    setInput('')
    setIsCorrect(false)
    setScore(0)
    setTotal(0)
    if (nextMode === 'lyrics') {
      setLyricIndex(0)
      return
    }
    setCurrentIndex(0)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>粵語拼音打字練習</h1>
        <p className="current-final">{isLyricsMode ? '當前模式：歌詞跟打' : `當前韻母：${selectedFinal}`}</p>
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'reference' ? 'active' : ''}`}
            onClick={() => switchMode('reference')}
          >
            參考模式
          </button>
          <button 
            className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
            onClick={() => switchMode('advanced')}
          >
            進階模式
          </button>
          <button
            className={`mode-btn ${mode === 'lyrics' ? 'active' : ''}`}
            onClick={() => switchMode('lyrics')}
          >
            歌詞模式
          </button>
        </div>
        {isLyricsMode && (
          <div className="lyrics-mode-toggle">
            <button
              className={`mode-btn ${lyricsRookieMode ? 'active' : ''}`}
              onClick={() => setLyricsRookieMode(true)}
            >
              菜鳥模式
            </button>
            <button
              className={`mode-btn ${!lyricsRookieMode ? 'active' : ''}`}
              onClick={() => setLyricsRookieMode(false)}
            >
              普通模式
            </button>
          </div>
        )}
      </header>

      <main className="main">
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

        <TypingStats accuracy={accuracy} score={score} total={total} />
        {isLyricsMode ? (
          <LyricsPractice
            tokens={lyricTokens}
            currentIndex={lyricIndex}
            input={input}
            rookieMode={lyricsRookieMode}
          />
        ) : isLoadingWords || !currentWord ? (
          <div className="loading-state">正在加载 {selectedFinal} 韻母練習詞...</div>
        ) : (
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
        )}

        <ReferenceSections />
      </main>

      <footer className="footer">
        <p>數據參考: <a href="https://jyutping.io/tutorial" target="_blank" rel="noopener noreferrer">粵拼.io</a></p>
      </footer>
    </div>
  )
}

export default App
