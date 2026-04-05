import { useState, useEffect, useCallback } from 'react'
import type { CantoneseWord } from '../types'
import type { JyutpingFinal } from '../data/finals'
import { fetchTrainingWordsByFinal } from '../api'

interface UseTypingModeReturn {
  trainingWords: CantoneseWord[]
  currentIndex: number
  currentWord: CantoneseWord | undefined
  isLoading: boolean
  nextWord: () => void
  reset: () => void
}

export function useTypingMode(selectedFinal: JyutpingFinal, enabled = true): UseTypingModeReturn {
  const [trainingWords, setTrainingWords] = useState<CantoneseWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const currentWord = trainingWords[currentIndex]

  useEffect(() => {
    if (!enabled) {
      setTrainingWords([])
      setCurrentIndex(0)
      setIsLoading(false)
      return
    }

    let cancelled = false

    const loadWords = async () => {
      setIsLoading(true)
      const words = await fetchTrainingWordsByFinal(selectedFinal)
      if (cancelled) return
      setTrainingWords(words)
      setCurrentIndex(0)
      setIsLoading(false)
    }

    loadWords()

    return () => {
      cancelled = true
    }
  }, [selectedFinal, enabled])

  const nextWord = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % trainingWords.length)
  }, [trainingWords.length])

  const reset = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  return {
    trainingWords,
    currentIndex,
    currentWord,
    isLoading,
    nextWord,
    reset,
  }
}
