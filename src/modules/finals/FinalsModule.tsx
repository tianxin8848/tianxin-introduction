import TypingPractice from '../../components/practice/TypingPractice'
import type { CantoneseWord } from '../../types'
import type { FinalsPracticeVariant } from '../../types'

interface FinalsModuleProps {
  selectedFinal: string
  isLoading: boolean
  words: CantoneseWord[]
  currentIndex: number
  input: string
  isCorrect: boolean
  variant: FinalsPracticeVariant
}

function FinalsModule({
  selectedFinal,
  isLoading,
  words,
  currentIndex,
  input,
  isCorrect,
  variant,
}: FinalsModuleProps) {
  if (isLoading) {
    return <div className="loading-state">正在加载 {selectedFinal} 韻母練習詞...</div>
  }

  return (
    <TypingPractice
      words={words}
      currentIndex={currentIndex}
      input={input}
      rookieMode={variant === 'reference'}
      isCorrect={isCorrect}
    />
  )
}

export default FinalsModule
