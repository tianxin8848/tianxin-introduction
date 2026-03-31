import { useState, useEffect, useCallback } from 'react'

interface UseKeyboardReturn {
  input: string
  setInput: (value: string) => void
  clearInput: () => void
  backspace: () => void
  appendChar: (char: string) => void
}

interface UseKeyboardProps {
  isActive: boolean
  onEnter: () => void
}

export function useKeyboard({ isActive, onEnter }: UseKeyboardProps): UseKeyboardReturn {
  const [input, setInput] = useState('')

  const clearInput = useCallback(() => {
    setInput('')
  }, [])

  const backspace = useCallback(() => {
    setInput((prev) => prev.slice(0, -1))
  }, [])

  const appendChar = useCallback((char: string) => {
    setInput((prev) => `${prev}${char.toLowerCase()}`)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key
      if (key === 'Enter') {
        event.preventDefault()
        onEnter()
        return
      }
      if (key === 'Backspace') {
        event.preventDefault()
        backspace()
        return
      }
      if (/^[a-zA-Z0-9]$/.test(key)) {
        event.preventDefault()
        appendChar(key)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isActive, onEnter, backspace, appendChar])

  return {
    input,
    setInput,
    clearInput,
    backspace,
    appendChar,
  }
}
