export interface CantoneseWord {
  character: string;
  jyutping: string;
  meaning: string;
}

export interface LyricToken {
  character: string;
  jyutping: string;
  isPunctuation?: boolean;
}

export interface PolitenessPhrase {
  character: string;
  jyutping: string;
  meaning: string;
  category: string;
}

/** 韻母模塊內：參考 / 進階（非路由，僅 UI 狀態） */
export type FinalsPracticeVariant = 'reference' | 'advanced'
