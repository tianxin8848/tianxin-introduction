import { useState, useCallback } from 'react'

interface UseScoreReturn {
  score: number
  total: number
  accuracy: number
  isCorrect: boolean
  input: string
  setCorrect: (value: boolean) => void
  setInput: (value: string) => void
  clearInput: () => void
  incrementScore: () => void
  incrementTotal: () => void
  reset: () => void
}

export function useScore(): UseScoreReturn {
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [input, setInput] = useState('')

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const setCorrect = useCallback((value: boolean) => {
    setIsCorrect(value)
  }, [])

  const handleSetInput = useCallback((value: string) => {
    setInput(value)
  }, [])

  const clearInput = useCallback(() => {
    setInput('')
  }, [])

  const incrementScore = useCallback(() => {
    setScore((prev) => prev + 1)
  }, [])

  const incrementTotal = useCallback(() => {
    setTotal((prev) => prev + 1)
  }, [])

  const reset = useCallback(() => {
    setScore(0)
    setTotal(0)
    setIsCorrect(false)
    setInput('')
  }, [])

  return {
    score,
    total,
    accuracy,
    isCorrect,
    input,
    setCorrect,
    setInput: handleSetInput,
    clearInput,
    incrementScore,
    incrementTotal,
    reset,
  }
}
