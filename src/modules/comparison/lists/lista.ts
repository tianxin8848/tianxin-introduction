import type { ComparisonListDefinition } from '../comparisonData'

/** 文件名（不含 .ts）即 URL 段：`/m/comparison/lista` */
const lista: ComparisonListDefinition = {
  navShort: 'A',
  navLabel: '對照表 A（lista）',
  title: '普通話拼音與粵拼差異（一）',
  description: '以下為常見對照思路（聲母與拼寫習慣），實際讀音請以詞典與音頻為準。',
  rows: [
    { mandarin: 'zh / ch / sh', cantonese: 'z / c / s（部分字）或 j', note: '粵語無捲舌音，對應關係因字而異' },
    { mandarin: 'j / q / x（齊齒呼）', cantonese: 'g / k / h 或 gw / kw', note: '粵語保留更多舌根塞音拼法' },
    { mandarin: '-ong', cantonese: '-ung', note: '如 中 zung1' },
  ],
}

export default lista
