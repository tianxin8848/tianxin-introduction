import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { CantoneseWord } from '../../types'
import {
  charBaseSx,
  hintTextSx,
  inputChipSx,
  jyutpingPlainSx,
  jyutpingRowSx,
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
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(5, minmax(0, 1fr))',
            sm: 'repeat(8, minmax(0, 1fr))',
            md: 'repeat(10, minmax(0, 1fr))',
          },
          gap: '10px 6px',
          py: 0.75,
          px: 1.25,
          alignItems: 'start',
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
            const prefixLen = Math.min(typed.length, target.length)
            const restStart = prefixLen

            const parts: React.ReactNode[] = []
            for (let i = 0; i < prefixLen; i++) {
              parts.push(
                <Typography key={`t-${absoluteIndex}-${i}`} component="span" sx={inputChipSx}>
                  {typed[i]}
                </Typography>,
              )
            }

            for (let i = restStart; i < target.length; i++) {
              parts.push(
                <Typography key={`h-${absoluteIndex}-${i}`} component="span" sx={hintTextSx}>
                  {target[i]}
                </Typography>,
              )
            }

            if (typed.length > target.length) {
              for (let i = target.length; i < typed.length; i++) {
                parts.push(
                  <Typography key={`x-${absoluteIndex}-${i}`} component="span" sx={inputChipSx}>
                    {typed[i]}
                  </Typography>,
                )
              }
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

          return (
            <Box
              key={`${word.character}-${absoluteIndex}`}
              sx={{
                minWidth: 0,
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
                sx={{
                  ...charBaseSx,
                  color: isPast ? 'success.dark' : isCurrent ? 'grey.900' : 'grey.400',
                }}
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
