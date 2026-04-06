/** 普粵對照：類型定義。具體列表請在 ./lists/*.{ts,tsx} 中各建一檔，由 comparisonListRegistry 自動掛載 */

import type { ReactNode } from 'react'

export interface PinyinComparisonRow {
  mandarin: string
  cantonese: string
  note: string
}

export interface ComparisonListDefinition {
  title: string
  description: string
  /** 默認三列表格數據；若設了 renderBody 則不讀此欄 */
  rows?: PinyinComparisonRow[]
  /**
   * 自訂主體（如在本檔用 MUI Table 手寫結構）。
   * 提供時忽略 rows，仍由 ComparisonModule 包在同一 Paper 與標題下。
   */
  renderBody?: () => ReactNode
  /** 側欄收起時 Tab 顯示，未填則用序號 1、2、3… */
  navShort?: string
  /** 側欄 Tab 完整標題，未填則為「對照表（檔名）」 */
  navLabel?: string
}
