import { useState, useCallback } from 'react'
import type { LyricToken } from '../types'

interface UseLyricsModeReturn {
  lyricIndex: number
  currentToken: LyricToken | undefined
  segmentSize: number
  currentSegment: number
  setSegmentSize: (size: number) => void
  setCurrentSegment: (segment: number) => void
  submitInput: (input: string) => boolean
  reset: () => void
}

interface UseLyricsModeProps {
  tokens: LyricToken[]
}

export function useLyricsMode({ tokens }: UseLyricsModeProps): UseLyricsModeReturn {
  const [lyricIndex, setLyricIndex] = useState(0)
  const [segmentSize, setSegmentSize] = useState<number>(50)
  const [currentSegment, setCurrentSegment] = useState<number>(0)

  const currentToken = tokens[lyricIndex]

  const submitInput = useCallback((input: string): boolean => {
    if (!currentToken || currentToken.isPunctuation) return false
    
    const normalizedInput = input.trim().toLowerCase()
    const isMatched = normalizedInput === currentToken.jyutping.toLowerCase()
    
    if (!isMatched) return false

    let nextIndex = lyricIndex + 1
    
    // 跳过标点符号
    while (nextIndex < tokens.length && tokens[nextIndex].isPunctuation) {
      nextIndex += 1
    }
    
    // 如果到达当前段末尾，自动切换到下一段
    if (nextIndex >= tokens.length) {
      // 到达歌词末尾，重置到开头
      setLyricIndex(0)
      setCurrentSegment(0)
    } else {
      setLyricIndex(nextIndex)
      
      // 检查是否需要切换到下一段
      const currentSegmentStart = currentSegment * segmentSize
      const currentSegmentEnd = Math.min(currentSegmentStart + segmentSize, tokens.length)
      
      if (nextIndex >= currentSegmentEnd && segmentSize > 0) {
        // 自动切换到下一段
        const nextSegment = currentSegment + 1
        const totalSegments = Math.ceil(tokens.length / segmentSize)
        if (nextSegment < totalSegments) {
          setCurrentSegment(nextSegment)
        }
      }
    }
    
    return true
  }, [currentToken, lyricIndex, tokens, currentSegment, segmentSize])

  const reset = useCallback(() => {
    setLyricIndex(0)
    setCurrentSegment(0)
  }, [])

  return {
    lyricIndex,
    currentToken,
    segmentSize,
    currentSegment,
    setSegmentSize,
    setCurrentSegment,
    submitInput,
    reset,
  }
}
