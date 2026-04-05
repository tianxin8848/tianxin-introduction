import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { LyricToken } from '../../types'
import {
  charBaseSx,
  hintTextSx,
  inputChipSx,
  jyutpingPlainSx,
  jyutpingRowSx,
} from './muiPracticeStyles'

interface LyricsPracticeProps {
  tokens: LyricToken[]
  currentIndex: number
  input: string
  rookieMode: boolean
  isCorrect?: boolean
  segmentSize?: number
  currentSegment?: number
}

function LyricsPractice({
  tokens,
  currentIndex,
  input,
  rookieMode,
  isCorrect = false,
  segmentSize = 50,
  currentSegment = 0,
}: LyricsPracticeProps) {
  const getCurrentSegmentTokens = () => {
    if (segmentSize <= 0) return tokens

    const startIndex = currentSegment * segmentSize
    const endIndex = Math.min(startIndex + segmentSize, tokens.length)
    return tokens.slice(startIndex, endIndex)
  }

  const currentTokens = getCurrentSegmentTokens()
  const totalSegments = segmentSize > 0 ? Math.ceil(tokens.length / segmentSize) : 1

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 980,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {totalSegments > 1 && (
        <Box
          sx={{
            textAlign: 'center',
            mb: 1.5,
            py: 1,
            px: 1,
            bgcolor: 'grey.50',
            borderRadius: 1,
            width: '100%',
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            段落 {currentSegment + 1} / {totalSegments}
          </Typography>
        </Box>
      )}

      <Box
        component="article"
        aria-label="歌詞打字"
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px 6px',
          py: 0.75,
          px: 1.25,
        }}
      >
        {currentTokens.map((token, segmentIndex) => {
          const absoluteIndex = currentSegment * segmentSize + segmentIndex
          const isPast = absoluteIndex < currentIndex
          const isCurrent = absoluteIndex === currentIndex
          const target = token.isPunctuation ? '' : token.jyutping
          const typed = isCurrent ? input : ''

          const renderRookieJyutping = () => {
            if (token.isPunctuation) return null

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

          const topText = token.isPunctuation
            ? ''
            : rookieMode
              ? isCurrent
                ? ''
                : token.jyutping
              : isPast
                ? token.jyutping
                : isCurrent
                  ? input
                  : ''

          return (
            <Box
              key={`${token.character}-${absoluteIndex}`}
              sx={{
                minWidth: token.isPunctuation ? '1em' : '2.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={jyutpingRowSx}>
                {rookieMode ? (
                  isCurrent ? (
                    isCorrect || input.length === 0 ? (
                      <Typography component="span" sx={hintTextSx}>
                        {target}
                      </Typography>
                    ) : (
                      <Box component="span" sx={jyutpingPlainSx}>
                        {renderRookieJyutping()}
                      </Box>
                    )
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
                {token.character}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {totalSegments > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
            py: 1.5,
            px: 1.5,
            bgcolor: 'grey.50',
            borderRadius: 1,
            width: '100%',
          }}
        >
          {Array.from({ length: totalSegments }).map((_, idx) => (
            <Box
              key={`segment-${idx}`}
              title={`段落 ${idx + 1}`}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: idx === currentSegment ? 'primary.main' : 'grey.300',
                transform: idx === currentSegment ? 'scale(1.2)' : 'none',
                transition: (theme) => theme.transitions.create(['background-color', 'transform']),
                '&:hover': { bgcolor: idx === currentSegment ? 'primary.main' : 'grey.400' },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default LyricsPractice
