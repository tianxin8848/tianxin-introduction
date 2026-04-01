import type { CantoneseWord } from '../types'
import type { JyutpingFinal } from '../data/finals'
import { vowels } from '../data/vowel'

type VowelItem = {
  word: string
  example: string
}

export async function fetchTrainingWordsByFinal(finalKey: JyutpingFinal): Promise<CantoneseWord[]> {
  try {
    const entries = vowels[0][finalKey] ?? []
    const normalized = entries
      .map((item: VowelItem) => ({
        character: String(item.example ?? '').trim(),
        jyutping: String(item.word ?? '').trim().toLowerCase(),
        meaning: '示例字',
      }))
      .filter((item: { character: string; jyutping: string }) => item.character && item.jyutping)

    const shuffled = [...normalized].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  } catch (error) {
    console.error('读取韵母数据失败:', error)
    return []
  }
}
