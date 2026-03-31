import { useState, useCallback } from 'react'
import type { PolitenessPhrase } from '../types'

interface UsePolitenessModeReturn {
  politenessIndex: number
  currentPhrase: PolitenessPhrase | undefined
  submitInput: (input: string) => boolean
  reset: () => void
}

interface UsePolitenessModeProps {
  phrases: PolitenessPhrase[]
}

export function usePolitenessMode({ phrases }: UsePolitenessModeProps): UsePolitenessModeReturn {
  const [politenessIndex, setPolitenessIndex] = useState(0)

  const currentPhrase = phrases[politenessIndex]

  const submitInput = useCallback((input: string): boolean => {
    if (!currentPhrase) return false
    
    const normalizedInput = input.trim().toLowerCase()
    const isMatched = normalizedInput === currentPhrase.jyutping.toLowerCase()

    if (isMatched) {
      setPolitenessIndex((prev) => (prev + 1) % phrases.length)
      return true
    }
    
    return false
  }, [currentPhrase, phrases.length])

  const reset = useCallback(() => {
    setPolitenessIndex(0)
  }, [])

  return {
    politenessIndex,
    currentPhrase,
    submitInput,
    reset,
  }
}
