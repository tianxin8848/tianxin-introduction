import type { SxProps, Theme } from '@mui/material/styles'

/** Shared visual tokens for TypingPractice / LyricsPractice token rows */
export const jyutpingRowSx: SxProps<Theme> = {
  minHeight: '1.2em',
  mb: 0.5,
  color: 'text.secondary',
  fontSize: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  pb: 0.75,
  borderBottom: '1px solid',
  borderColor: 'grey.300',
}

export const hintTextSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: 13,
  lineHeight: '18px',
  fontWeight: 600,
  display: 'inline-block',
}

export const jyutpingPlainSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
}

export const inputChipSx: SxProps<Theme> = {
  display: 'inline-block',
  color: 'grey.900',
  borderRadius: '3px',
  fontSize: 13,
  lineHeight: '18px',
  fontWeight: 600,
}

export const charBaseSx: SxProps<Theme> = {
  fontSize: 'clamp(28px, 4.5vw, 42px)',
  color: 'grey.400',
  fontWeight: 600,
  lineHeight: 1.15,
}
