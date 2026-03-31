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
  const [lyricsSegmentSize, setLyricsSegmentSize] = useState<number>(50)
  const [lyricsCurrentSegment, setLyricsCurrentSegment] = useState<number>(0)
  const [input, setInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
    
    // 跳过标点符号
    while (nextIndex < lyricTokens.length && lyricTokens[nextIndex].isPunctuation) {
      nextIndex += 1
    }
    
    // 如果到达当前段末尾，自动切换到下一段
    if (nextIndex >= lyricTokens.length) {
      // 到达歌词末尾，重置到开头
      setLyricIndex(0)
      setLyricsCurrentSegment(0)
    } else {
      setLyricIndex(nextIndex)
      
      // 检查是否需要切换到下一段
      const currentSegmentStart = lyricsCurrentSegment * lyricsSegmentSize
      const currentSegmentEnd = Math.min(currentSegmentStart + lyricsSegmentSize, lyricTokens.length)
      
      if (nextIndex >= currentSegmentEnd && lyricsSegmentSize > 0) {
        // 自动切换到下一段
        const nextSegment = lyricsCurrentSegment + 1
        const totalSegments = Math.ceil(lyricTokens.length / lyricsSegmentSize)
        if (nextSegment < totalSegments) {
          setLyricsCurrentSegment(nextSegment)
        }
      }
    }
  }, [currentLyricToken, input, lyricIndex, lyricTokens, lyricsCurrentSegment, lyricsSegmentSize])

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
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1>粵語拼音打字練習</h1>
          <button 
            className="toggle-sidebar-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "展開側邊欄" : "收起側邊欄"}
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>
        <p className="current-final">{isLyricsMode ? '當前模式：歌詞跟打' : `當前韻母：${selectedFinal}`}</p>
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'reference' ? 'active' : ''}`}
            onClick={() => switchMode('reference')}
            title="參考模式"
          >
            {sidebarCollapsed ? "參" : "參考模式"}
          </button>
          <button 
            className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
            onClick={() => switchMode('advanced')}
            title="進階模式"
          >
            {sidebarCollapsed ? "進" : "進階模式"}
          </button>
          <button
            className={`mode-btn ${mode === 'lyrics' ? 'active' : ''}`}
            onClick={() => switchMode('lyrics')}
            title="歌詞模式"
          >
            {sidebarCollapsed ? "歌" : "歌詞模式"}
          </button>
        </div>
        {isLyricsMode && (
          <div className="lyrics-mode-toggle">
            <button
              className={`mode-btn ${lyricsRookieMode ? 'active' : ''}`}
              onClick={() => setLyricsRookieMode(true)}
              title="菜鳥模式"
            >
              {sidebarCollapsed ? "菜" : "菜鳥模式"}
            </button>
            <button
              className={`mode-btn ${!lyricsRookieMode ? 'active' : ''}`}
              onClick={() => setLyricsRookieMode(false)}
              title="普通模式"
            >
              {sidebarCollapsed ? "普" : "普通模式"}
            </button>
          </div>
        )}
      </aside>

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
          <>
            {/* 分段控制 */}
            <div className="lyrics-segment-controls">
              <div className="segment-size-control">
                <label htmlFor="segmentSize">每段字数: </label>
                <select
                  id="segmentSize"
                  value={lyricsSegmentSize}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value)
                    setLyricsSegmentSize(newSize)
                    // 重新计算当前段
                    const newSegment = Math.floor(lyricIndex / newSize)
                    setLyricsCurrentSegment(newSegment)
                  }}
                >
                  <option value="30">30字</option>
                  <option value="50">50字</option>
                  <option value="80">80字</option>
                  <option value="100">100字</option>
                  <option value="0">不分段</option>
                </select>
              </div>
              
              {lyricsSegmentSize > 0 && (
                <div className="segment-nav-controls">
                  <button
                    onClick={() => setLyricsCurrentSegment(prev => Math.max(0, prev - 1))}
                    disabled={lyricsCurrentSegment === 0}
                  >
                    上一段
                  </button>
                  <span className="segment-info">
                    段落 {lyricsCurrentSegment + 1} / {Math.ceil(lyricTokens.length / lyricsSegmentSize)}
                  </span>
                  <button
                    onClick={() => {
                      const totalSegments = Math.ceil(lyricTokens.length / lyricsSegmentSize)
                      setLyricsCurrentSegment(prev => Math.min(totalSegments - 1, prev + 1))
                    }}
                    disabled={lyricsCurrentSegment >= Math.ceil(lyricTokens.length / lyricsSegmentSize) - 1}
                  >
                    下一段
                  </button>
                </div>
              )}
            </div>
            
            <LyricsPractice
              tokens={lyricTokens}
              currentIndex={lyricIndex}
              input={input}
              rookieMode={lyricsRookieMode}
              segmentSize={lyricsSegmentSize}
              currentSegment={lyricsCurrentSegment}
            />
          </>
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
