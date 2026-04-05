import type { SxProps, Theme } from '@mui/material/styles'

/** Shared visual tokens for TypingPractice / LyricsPractice token rows */
export const jyutpingRowSx: SxProps<Theme> = {
  minHeight: '1.2em',
  mb: '0.25em',
  lineHeight: 1,
  color: 'text.secondary',
  fontSize: { xs: '0.9em', sm: '1em' },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  position: 'relative',
  width: '100%',
  userSelect: 'none',
}

/** Han glyph styling — scales like jyutping.io (1.6em / 2em / 2.4em at base 16px) */
export const charBaseSx: SxProps<Theme> = {
  fontFamily: '"Noto Serif TC", "Songti SC", "PMingLiU", serif',
  fontSize: { xs: '1.55rem', sm: '2rem', md: '2.4rem' },
  fontWeight: 600,
  lineHeight: 1,
  userSelect: 'none',
}

export const hintTextSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: 'inherit',
  lineHeight: 1,
  fontWeight: 500,
  display: 'inline-block',
}

export const jyutpingPlainSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1px',
}

/** Matched prefix letters in rookie mode (cf. jyutping.io bg-green-500 text-white) */
export const pinyinTypedCorrectSx: SxProps<Theme> = {
  display: 'inline-block',
  color: 'common.white',
  bgcolor: 'success.main',
  borderRadius: '2px',
  px: '2px',
  mx: '1px',
  fontSize: 'inherit',
  lineHeight: 1,
  fontWeight: 600,
}

/** Wrong letters in rookie mode (cf. jyutping.io bg-red-500 + line-through) */
export const pinyinTypedWrongSx: SxProps<Theme> = {
  display: 'inline-block',
  color: 'common.white',
  bgcolor: 'error.main',
  borderRadius: '2px',
  px: '2px',
  mx: '1px',
  fontSize: 'inherit',
  lineHeight: 1,
  fontWeight: 600,
  textDecoration: 'line-through',
}

/** Bottom bar under the active glyph (jyutping.io after: pseudo) */
export const currentCharUnderlineSx: SxProps<Theme> = {
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: -8,
    height: { xs: 3, sm: 5 },
    borderRadius: 0.5,
    bgcolor: 'grey.300',
  },
}
