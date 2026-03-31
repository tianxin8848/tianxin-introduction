import type { CantoneseWord } from './types'
import type { JyutpingFinal } from './finals'

type LocalWordEntry = {
  word?: string
  example?: string
}

type LocalWordMap = Record<string, LocalWordEntry[]>

function parseWordJsonText(rawText: string): LocalWordMap {
  const match = rawText.match(/\{[\s\S]*\}/)
  if (!match) return {}
  try {
    return JSON.parse(match[0]) as LocalWordMap
  } catch (error) {
    console.error('word.json 解析失败:', error)
    return {}
  }
}

export async function fetchTrainingWordsByFinal(finalKey: JyutpingFinal): Promise<CantoneseWord[]> {
  try {
    const response = await fetch('/00/word.json')
    const rawText = await response.text()
    const allWords = parseWordJsonText(rawText)
    const entries = allWords[finalKey] ?? []
    const normalized = entries
      .map((item) => ({
        character: String(item.example ?? '').trim(),
        jyutping: String(item.word ?? '').trim().toLowerCase(),
        meaning: '示例字',
      }))
      .filter((item) => item.character && item.jyutping)

    const shuffled = [...normalized].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  } catch (error) {
    console.error('读取 word.json 失败:', error)
    return []
  }
}
