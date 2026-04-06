import type { ComparisonListDefinition } from '../comparisonData'

/** 新增對照表：複製本檔改名為 `listd.ts` 等，並填寫內容即可 */
const listc: ComparisonListDefinition = {
  navShort: 'C',
  navLabel: '對照表 C（listc）',
  title: '普通話拼音與粵拼差異（三）',
  description: '可在此目錄繼續增加 listd、liste 等檔案，構建時會自動掛載到路由。',
  rows: [
    { mandarin: '（示例）', cantonese: '（示例）', note: '請改為實際對照內容' },
  ],
}

export default listc
