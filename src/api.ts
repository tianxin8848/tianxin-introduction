import OpenAI from 'openai'
import { cantoneseWords } from './data'
import type { CantoneseWord } from './types'
import type { JyutpingFinal } from './finals'

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY ?? ''
const INITIALS = ['gw', 'kw', 'ng', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'w', 'z', 'c', 's', 'j']

function stripTone(jyutping: string): string {
  return jyutping.toLowerCase().trim().replace(/[1-6]$/g, '')
}

function extractFinal(jyutping: string): string {
  const noTone = stripTone(jyutping)
  const matchedInitial = INITIALS.find((initial) => noTone.startsWith(initial))
  if (!matchedInitial) return noTone
  return noTone.slice(matchedInitial.length)
}

function matchesFinal(jyutping: string, finalKey: JyutpingFinal): boolean {
  const final = extractFinal(jyutping)
  if (finalKey === 'm' || finalKey === 'ng') return final === finalKey
  return final.startsWith(finalKey)
}

function getFallbackWords(finalKey: JyutpingFinal): CantoneseWord[] {
  const picked = cantoneseWords.filter((item) => matchesFinal(item.jyutping, finalKey))
  const shuffled = [...picked].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 10)
}

function parseWordsFromResponse(content: string): CantoneseWord[] {
  const jsonMatch = content.match(/\[[\s\S]*\]/)
  const raw = jsonMatch ? jsonMatch[0] : content
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) return []
  return data
    .map((item) => ({
      character: String(item.character ?? '').trim(),
      jyutping: String(item.jyutping ?? '').trim().toLowerCase(),
      meaning: String(item.meaning ?? '').trim(),
    }))
    .filter((item) => item.character && item.jyutping && item.meaning)
}

export async function fetchTrainingWordsByFinal(finalKey: JyutpingFinal): Promise<CantoneseWord[]> {
  if (!DEEPSEEK_API_KEY) return getFallbackWords(finalKey)

  try {
    const client = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: DEEPSEEK_API_KEY,
      dangerouslyAllowBrowser: true,
    })

    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      temperature: 1,
      messages: [
        {
          role: 'system',
          content:
            '你是粤语老师。你只返回 JSON 数组，不要 markdown。每项必须有 character, jyutping, meaning 三个字段。',
        },
        {
          role: 'user',
          content: `请随机给我 10 个主要韵母包含 "${finalKey}" 的粤语常用单字词。jyutping 需要标准并带声调数字。meaning 用简短英文。`,
        },
      ],
    })

    const content = completion.choices[0]?.message?.content ?? ''
    const words = parseWordsFromResponse(content).filter((item) => matchesFinal(item.jyutping, finalKey))
    if (words.length >= 5) return words.slice(0, 10)
    return getFallbackWords(finalKey)
  } catch (error) {
    console.error('DeepSeek 生成训练词失败:', error)
    return getFallbackWords(finalKey)
  }
}
