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

export type Mode = 'reference' | 'advanced' | 'lyrics' | 'politeness';
