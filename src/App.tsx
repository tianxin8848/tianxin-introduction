import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Navigate, useParams, useLocation } from 'react-router-dom'
import './App.css'
import type { FinalsPracticeVariant } from './types'
import type { JyutpingFinal } from './data/finals'
import { isJyutpingFinal } from './data/finals'
import { lyricTokens } from './data/lyricsData'
import { politenessPhrases } from './data/politenessData'
import { getModuleByPathSegment } from './registry'
import { useTypingMode, useLyricsMode, usePolitenessMode, useScore, useKeyboard } from './hooks'

import Sidebar from './components/layout/Sidebar'
import ProgressCard from './components/stats/ProgressCard'
import TypingStats from './components/stats/TypingStats'
import ReferenceSections from './components/practice/ReferenceSections'
import FinalsModule from './modules/finals/FinalsModule'
import LyricsModule from './modules/lyrics/LyricsModule'
import PolitenessModule from './modules/politeness/PolitenessModule'
import { ComparisonModule } from './modules'
import type { ComparisonListId } from './modules/comparison/comparisonListRegistry'

function App() {
  const { moduleId, segment } = useParams<{ moduleId: string; segment?: string }>()
  const location = useLocation()
  const mod = getModuleByPathSegment(moduleId)

  const [finalsVariant, setFinalsVariant] = useState<FinalsPracticeVariant>('reference')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [lyricsRookieMode, setLyricsRookieMode] = useState(true)

  if (!mod) {
    return <Navigate to="/m/finals/aa" replace />
  }

  if (mod.childSegment) {
    const ok = segment && mod.childSegment.validate(segment)
    if (!ok) {
      return <Navigate to={`/m/${mod.pathSegment}/${mod.childSegment.default}`} replace />
    }
  }

  const selectedFinal: JyutpingFinal = useMemo(() => {
    if (mod.kind !== 'finals') return 'aa'
    return segment && isJyutpingFinal(segment) ? segment : mod.childSegment!.default as JyutpingFinal
  }, [mod, segment])

  const isFinals = mod.kind === 'finals'
  const isLyrics = mod.kind === 'lyrics'
  const isPoliteness = mod.kind === 'politeness'
  const isComparison = mod.kind === 'comparison'

  const typingMode = useTypingMode(selectedFinal, isFinals)
  const lyricsMode = useLyricsMode({ tokens: lyricTokens })
  const politenessMode = usePolitenessMode({ phrases: politenessPhrases })
  const score = useScore()

  const keyboard = useKeyboard({
    isActive: mod.captureKeys,
    onEnter: () => {
      const mockEvent = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(mockEvent)
    },
  })

  useEffect(() => {
    score.setInput(keyboard.input)
  }, [keyboard.input, score])

  useEffect(() => {
    score.reset()
    lyricsMode.reset()
    politenessMode.reset()
    typingMode.reset()
  }, [location.pathname])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (isComparison) return

      if (isLyrics) {
        const isMatched = lyricsMode.submitInput(score.input)
        score.incrementTotal()
        if (isMatched) {
          score.setCorrect(true)
          score.incrementScore()
          keyboard.clearInput()
          setTimeout(() => {
            score.setCorrect(false)
          }, 500)
        }
        return
      }

      if (isPoliteness) {
        const isMatched = politenessMode.submitInput(score.input)
        score.incrementTotal()
        if (isMatched) {
          score.setCorrect(true)
          score.incrementScore()
          keyboard.clearInput()
          setTimeout(() => {
            score.setCorrect(false)
          }, 500)
        }
        return
      }

      if (!typingMode.currentWord) return

      const normalizedInput = score.input.trim().toLowerCase()
      const isMatched = normalizedInput === typingMode.currentWord.jyutping.toLowerCase()

      score.incrementTotal()
      if (isMatched) {
        score.setCorrect(true)
        score.incrementScore()
        keyboard.clearInput()
        setTimeout(() => {
          score.setCorrect(false)
          typingMode.nextWord()
        }, 500)
      }
    },
    [
      isComparison,
      isLyrics,
      isPoliteness,
      lyricsMode,
      politenessMode,
      typingMode,
      score,
      keyboard,
    ],
  )

  const totalWords = isLyrics
    ? lyricTokens.filter((token) => !token.isPunctuation).length
    : isPoliteness
      ? politenessPhrases.length
      : isFinals
        ? typingMode.trainingWords.length
        : 0

  const progressBase = isLyrics
    ? lyricTokens.slice(0, lyricsMode.lyricIndex + 1).filter((token) => !token.isPunctuation).length
    : isPoliteness
      ? politenessMode.politenessIndex + 1
      : isFinals
        ? typingMode.currentIndex + 1
        : 0

  const progressPercent = totalWords > 0 ? Math.round((progressBase / totalWords) * 100) : 0
  const currentProgress = totalWords > 0 ? progressBase : 0

  return (
    <div className="app">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        moduleKind={mod.kind}
        selectedFinal={selectedFinal}
        finalsVariant={finalsVariant}
        setFinalsVariant={setFinalsVariant}
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

        {isLyrics ? (
          <LyricsModule
            tokens={lyricTokens}
            lyricIndex={lyricsMode.lyricIndex}
            input={score.input}
            rookieMode={lyricsRookieMode}
            isCorrect={score.isCorrect}
            segmentSize={lyricsMode.segmentSize}
            currentSegment={lyricsMode.currentSegment}
            setSegmentSize={lyricsMode.setSegmentSize}
            setCurrentSegment={lyricsMode.setCurrentSegment}
          />
        ) : isPoliteness ? (
          <PolitenessModule
            currentPhrase={politenessMode.currentPhrase}
            input={score.input}
            isCorrect={score.isCorrect}
            onInputChange={(value) => {
              score.setInput(value)
              score.setCorrect(false)
            }}
            onSubmit={handleSubmit}
          />
        ) : isComparison ? (
          <ComparisonModule listId={segment as ComparisonListId} />
        ) : (
          <FinalsModule
            selectedFinal={selectedFinal}
            isLoading={typingMode.isLoading}
            words={typingMode.trainingWords}
            currentIndex={typingMode.currentIndex}
            input={score.input}
            isCorrect={score.isCorrect}
            variant={finalsVariant}
          />
        )}

        <ReferenceSections />
      </main>

      <footer className="footer">
        <p>
          <a href="/testlist" target="_blank" rel="noopener noreferrer">
            测试列表
          </a>
        </p>
        <p>
          數據參考:{' '}
          <a href="https://corpus.eduhk.hk/cantonese" target="_blank" rel="noopener noreferrer">
            香港大学粤语研究
          </a>
        </p>
        <p>
          數據參考:{' '}
          <a href="https://jyutping.io/tutorial" target="_blank" rel="noopener noreferrer">
            粵拼.io
          </a>
        </p>
        <p>致谢: to those who support me</p>
      </footer>
    </div>
  )
}

export default App
