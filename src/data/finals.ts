export const JYUTPING_FINALS = ['aa', 'a', 'e', 'i', 'o', 'u', 'oe', 'eo', 'yu', 'm', 'ng'] as const

export type JyutpingFinal = (typeof JYUTPING_FINALS)[number]

export function isJyutpingFinal(value: string): value is JyutpingFinal {
  return JYUTPING_FINALS.includes(value as JyutpingFinal)
}
