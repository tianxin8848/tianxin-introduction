import type { ComparisonListDefinition } from '../comparisonData'

const listb: ComparisonListDefinition = {
  navShort: 'B',
  navLabel: '對照表 B（listb）',
  title: '普通話拼音與粵拼差異（二）',
  description: '以下為常見對照思路（韻母與韻尾），實際讀音請以詞典與音頻為準。',
  rows: [
    { mandarin: '-iao', cantonese: '-iu', note: '如 小 siu2' },
    { mandarin: '韻尾 -n / -ng 混感', cantonese: '鼻音韻尾對立更穩定', note: '需按粵語音系區分' },
  ],
}

export default listb
