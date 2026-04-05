/** 普粵對照示例：擴展模塊時只改數據即可驅動界面 */
export interface PinyinComparisonRow {
  mandarin: string
  cantonese: string
  note: string
}

export const PINYIN_COMPARISON_ROWS: PinyinComparisonRow[] = [
  { mandarin: 'zh / ch / sh', cantonese: 'z / c / s（部分字）或 j', note: '粵語無捲舌音，對應關係因字而異' },
  { mandarin: 'j / q / x（齊齒呼）', cantonese: 'g / k / h 或 gw / kw', note: '粵語保留更多舌根塞音拼法' },
  { mandarin: '-ong', cantonese: '-ung', note: '如 中 zung1' },
  { mandarin: '-iao', cantonese: '-iu', note: '如 小 siu2' },
  { mandarin: '韻尾 -n / -ng 混感', cantonese: '鼻音韻尾對立更穩定', note: '需按粵語音系區分' },
]
