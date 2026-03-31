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

export type Mode = 'reference' | 'advanced' | 'lyrics';
