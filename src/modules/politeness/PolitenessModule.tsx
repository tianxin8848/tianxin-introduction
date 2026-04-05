import PolitenessPractice from '../../components/practice/PolitenessPractice'
import type { PolitenessPhrase } from '../../types'

interface PolitenessModuleProps {
  currentPhrase: PolitenessPhrase | undefined
  input: string
  isCorrect: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function PolitenessModule({
  currentPhrase,
  input,
  isCorrect,
  onInputChange,
  onSubmit,
}: PolitenessModuleProps) {
  return (
    <PolitenessPractice
      currentPhrase={currentPhrase}
      input={input}
      isCorrect={isCorrect}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  )
}

export default PolitenessModule
