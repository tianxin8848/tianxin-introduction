import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { CantoneseWord } from '../../types'
import { jyutpingInputHasError } from '../../utils/jyutpingInput'
import {
  charBaseSx,
  currentCharUnderlineSx,
  hintTextSx,
  jyutpingPlainSx,
  jyutpingRowSx,
  pinyinTypedCorrectSx,
  pinyinTypedWrongSx,
} from './muiPracticeStyles'

interface TypingPracticeProps {
  words: CantoneseWord[]
  currentIndex: number
  input: string
  rookieMode?: boolean
  isCorrect?: boolean
}

function TypingPractice({
  words,
  currentIndex,
  input,
  rookieMode = false,
  isCorrect = false,
}: TypingPracticeProps) {
  const referenceWindowSize = 50
  const startIndex = rookieMode
    ? Math.max(0, currentIndex - Math.floor(referenceWindowSize / 2))
    : 0
  const endIndex = rookieMode
    ? Math.min(words.length, startIndex + referenceWindowSize)
    : words.length
  const visibleWords = rookieMode ? words.slice(startIndex, endIndex) : words

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 860,
        minHeight: 260,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="article"
        aria-label="打字練習"
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-end',
          columnGap: { xs: '4px', sm: '6px' },
          rowGap: { xs: '8px', sm: '24px' },
          py: { xs: 1, sm: 1.5 },
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        {visibleWords.map((word, indexWithinWindow) => {
          const absoluteIndex = rookieMode ? startIndex + indexWithinWindow : indexWithinWindow

          const isPast = absoluteIndex < currentIndex
          const isCurrent = absoluteIndex === currentIndex
          const target = word.jyutping
          const displayInput = isCurrent && isCorrect ? target : input
          const typed = isCurrent ? displayInput : ''

          const renderRookieJyutping = () => {
            const parts: React.ReactNode[] = []
            for (let i = 0; i < typed.length; i++) {
              const ok = i < target.length && typed[i].toLowerCase() === target[i].toLowerCase()
              parts.push(
                <Typography
                  key={`t-${absoluteIndex}-${i}`}
                  component="span"
                  sx={ok ? pinyinTypedCorrectSx : pinyinTypedWrongSx}
                >
                  {typed[i]}
                </Typography>,
              )
            }
            for (let i = typed.length; i < target.length; i++) {
              parts.push(
                <Typography key={`h-${absoluteIndex}-${i}`} component="span" sx={hintTextSx}>
                  {target[i]}
                </Typography>,
              )
            }
            return parts
          }

          const topText = rookieMode
            ? isCurrent
              ? ''
              : word.jyutping
            : isPast
              ? word.jyutping
              : isCurrent
                ? displayInput
                : ''

          const charColor = isPast
            ? 'success.dark'
            : isCurrent
              ? jyutpingInputHasError(typed, target)
                ? 'error.main'
                : 'text.primary'
              : 'grey.400'

          return (
            <Box
              key={`${word.character}-${absoluteIndex}`}
              sx={{
                minWidth: '2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={jyutpingRowSx}>
                {rookieMode ? (
                  isCurrent ? (
                    <Box component="span" sx={jyutpingPlainSx}>
                      {renderRookieJyutping()}
                    </Box>
                  ) : (
                    <Typography component="span" sx={hintTextSx}>
                      {topText}
                    </Typography>
                  )
                ) : (
                  <Typography component="span" sx={hintTextSx}>
                    {topText}
                  </Typography>
                )}
              </Box>
              <Typography
                component="span"
                sx={
                  [
                    charBaseSx,
                    isCurrent ? currentCharUnderlineSx : null,
                    { color: charColor },
                  ] as SxProps<Theme>
                }
              >
                {word.character}
              </Typography>
              <Typography
                component="div"
                variant="body2"
                sx={{ mt: 0.75, fontSize: 13, color: 'text.secondary', lineHeight: 1.2 }}
              >
                {word.meaning}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TypingPractice
