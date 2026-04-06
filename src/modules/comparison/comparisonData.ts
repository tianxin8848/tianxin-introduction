/** 普粵對照：類型定義。具體列表請在 ./lists/*.ts 中各建一檔，由 comparisonListRegistry 自動掛載 */

export interface PinyinComparisonRow {
  mandarin: string
  cantonese: string
  note: string
}

export interface ComparisonListDefinition {
  title: string
  description: string
  rows: PinyinComparisonRow[]
  /** 側欄收起時 Tab 顯示，未填則用序號 1、2、3… */
  navShort?: string
  /** 側欄 Tab 完整標題，未填則為「對照表（檔名）」 */
  navLabel?: string
}
