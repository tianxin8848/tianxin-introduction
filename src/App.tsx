import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'
import type { Mode } from './types'
import { isJyutpingFinal } from './data/finals'
import { lyricTokens } from './data/lyricsData'
import { politenessPhrases } from './data/politenessData'
import { useTypingMode, useLyricsMode, usePolitenessMode, useScore, useKeyboard } from './hooks'

// Components
import Sidebar from './components/layout/Sidebar'
import ProgressCard from './components/stats/ProgressCard'
import TypingStats from './components/stats/TypingStats'
import TypingPractice from './components/practice/TypingPractice'
import LyricsPractice from './components/practice/LyricsPractice'
import PolitenessPractice from './components/practice/PolitenessPractice'
import LyricsSegmentControls from './components/controls/LyricsSegmentControls'
import ReferenceSections from './components/practice/ReferenceSections'

function App() {
  const { final = 'aa' } = useParams()
  const selectedFinal = useMemo(() => (isJyutpingFinal(final) ? final : 'aa'), [final])

  const [mode, setMode] = useState<Mode>('reference')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [lyricsRookieMode, setLyricsRookieMode] = useState(true)

  const isLyricsMode = mode === 'lyrics'
  const isPolitenessMode = mode === 'politeness'

  // Initialize hooks
  const typingMode = useTypingMode(selectedFinal)
  const lyricsMode = useLyricsMode({ tokens: lyricTokens })
  const politenessMode = usePolitenessMode({ phrases: politenessPhrases })
  const score = useScore()
  
  // Keyboard input handling
  const keyboard = useKeyboard({
    isActive: true,
    onEnter: () => {
      // Create a synthetic form event for handleSubmit
      const mockEvent = {
        preventDefault: () => {}
      } as React.FormEvent
      handleSubmit(mockEvent)
    }
  })
  
  // Sync keyboard input with score input
  useEffect(() => {
    score.setInput(keyboard.input)
  }, [keyboard.input, score])

  // Handle mode switching
  const switchMode = useCallback((nextMode: Mode) => {
    setMode(nextMode)
    score.reset()
    
    if (nextMode === 'lyrics') {
      lyricsMode.reset()
    } else if (nextMode === 'politeness') {
      politenessMode.reset()
    } else {
      typingMode.reset()
    }
  }, [score, lyricsMode, politenessMode, typingMode])

  // Handle submit for all modes
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLyricsMode) {
      const isMatched = lyricsMode.submitInput(score.input)
      score.incrementTotal()
      if (isMatched) {
        score.setCorrect(true)
        score.incrementScore()
        setTimeout(() => {
          score.setCorrect(false)
        }, 500)
      }
      return
    }

    if (isPolitenessMode) {
      const isMatched = politenessMode.submitInput(score.input)
      score.incrementTotal()
      if (isMatched) {
        score.setCorrect(true)
        score.incrementScore()
        setTimeout(() => {
          score.setCorrect(false)
        }, 500)
      }
      return
    }

    // Typing mode
    if (!typingMode.currentWord) return
    
    const normalizedInput = score.input.trim().toLowerCase()
    const isMatched = normalizedInput === typingMode.currentWord.jyutping.toLowerCase()
    
    score.incrementTotal()
    if (isMatched) {
      score.setCorrect(true)
      score.incrementScore()
      setTimeout(() => {
        score.setCorrect(false)
        typingMode.nextWord()
      }, 500)
    }
  }, [isLyricsMode, isPolitenessMode, lyricsMode, politenessMode, typingMode, score])

  // Calculate progress
  const totalWords = isLyricsMode
    ? lyricTokens.filter((token) => !token.isPunctuation).length
    : isPolitenessMode
    ? politenessPhrases.length
    : typingMode.trainingWords.length

  const progressBase = isLyricsMode
    ? lyricTokens.slice(0, lyricsMode.lyricIndex + 1).filter((token) => !token.isPunctuation).length
    : isPolitenessMode
    ? politenessMode.politenessIndex + 1
    : typingMode.currentIndex + 1

  const progressPercent = totalWords > 0 ? Math.round((progressBase / totalWords) * 100) : 0
  const currentProgress = totalWords > 0 ? progressBase : 0

  return (
    <div className="app">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        selectedFinal={selectedFinal}
        isLyricsMode={isLyricsMode}
        mode={mode}
        switchMode={switchMode}
        lyricsRookieMode={lyricsRookieMode}
        setLyricsRookieMode={setLyricsRookieMode}
      />

      <main className="main">
        <ProgressCard
          currentProgress={currentProgress}
          totalWords={totalWords}
          progressPercent={progressPercent}
        />

        <TypingStats accuracy={score.accuracy} score={score.score} total={score.total} />
        
        {isLyricsMode ? (
          <>
            <LyricsSegmentControls
              lyricsSegmentSize={lyricsMode.segmentSize}
              setLyricsSegmentSize={lyricsMode.setSegmentSize}
              lyricsCurrentSegment={lyricsMode.currentSegment}
              setLyricsCurrentSegment={lyricsMode.setCurrentSegment}
              lyricIndex={lyricsMode.lyricIndex}
              lyricTokens={lyricTokens}
            />
            
            <LyricsPractice
              tokens={lyricTokens}
              currentIndex={lyricsMode.lyricIndex}
              input={score.input}
              rookieMode={lyricsRookieMode}
              segmentSize={lyricsMode.segmentSize}
              currentSegment={lyricsMode.currentSegment}
            />
          </>
        ) : isPolitenessMode ? (
          <PolitenessPractice
            currentPhrase={politenessMode.currentPhrase}
            input={score.input}
            isCorrect={score.isCorrect}
            onInputChange={(value) => {
              score.setInput(value)
              score.setCorrect(false)
            }}
            onSubmit={handleSubmit}
          />
        ) : typingMode.isLoading ? (
          <div className="loading-state">正在加载 {selectedFinal} 韻母練習詞...</div>
        ) : (
          <TypingPractice
            words={typingMode.trainingWords}
            currentIndex={typingMode.currentIndex}
            input={score.input}
            rookieMode={mode === 'reference'}
          />
        )}

        <ReferenceSections />
      </main>

      <footer className="footer">
          <p>數據參考: <a href="https://corpus.eduhk.hk/cantonese" target="_blank" rel="noopener noreferrer">香港大学粤语研究</a></p>
          <p>數據參考: <a href="https://jyutping.io/tutorial" target="_blank" rel="noopener noreferrer">粵拼.io</a></p>
          <p>致谢: to those who support me</p>
      </footer>
    </div>
  )
}

export default App