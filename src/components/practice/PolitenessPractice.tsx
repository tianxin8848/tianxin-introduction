import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import type { PolitenessPhrase } from '../../types'
import { politenessPhrases } from '../../data/politenessData'

interface PolitenessPracticeProps {
  currentPhrase: PolitenessPhrase | undefined
  input: string
  isCorrect: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function a11yProps(index: number) {
  return {
    id: `politeness-tab-${index}`,
    'aria-controls': `politeness-tabpanel-${index}`,
  } as const
}

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`politeness-tabpanel-${index}`}
      aria-labelledby={`politeness-tab-${index}`}
      {...other}
    >
      {value === index ? <Box sx={{ pt: 2, width: '100%' }}>{children}</Box> : null}
    </div>
  )
}

function PolitenessPractice({
  currentPhrase,
  input,
  isCorrect,
  onInputChange,
  onSubmit,
}: PolitenessPracticeProps) {
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (isCorrect) {
      onInputChange('')
    }
  }, [isCorrect, onInputChange])

  if (!currentPhrase) return null

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
        gap: 2.5,
      }}
    >
      <Paper elevation={1} sx={{ width: '100%', maxWidth: 860, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            aria-label="禮貌用語練習"
            variant="fullWidth"
          >
            <Tab label="練習" {...a11yProps(0)} />
            <Tab label="全部用語" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <Box sx={{ px: 2, pb: 2 }}>
          <TabPanel value={tab} index={0}>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                width: 'min(92%, 520px)',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="請輸入粵語拼音..."
                autoFocus
                slotProps={{
                  htmlInput: { sx: { textAlign: 'center', fontSize: { xs: 24, sm: 30 }, letterSpacing: 1 } },
                }}
                sx={(theme) => ({
                  ...(isCorrect && {
                    '& .MuiOutlinedInput-root': {
                      bgcolor: alpha(theme.palette.success.main, 0.08),
                      '& fieldset': { borderColor: 'success.main' },
                    },
                  }),
                })}
              />
              <Typography variant="body2" color="text.secondary">
                提示：{currentPhrase.jyutping}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: 'clamp(56px, 11vw, 120px)', sm: 'clamp(72px, 11vw, 132px)' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: 'grey.400',
                }}
              >
                {currentPhrase.character}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: 16, color: 'text.secondary' }}>
                {currentPhrase.meaning}
              </Typography>
              <Box sx={{ mt: 0.5, fontSize: 14, color: 'text.secondary' }}>
                <Typography component="span" fontWeight={500}>
                  分類：
                </Typography>{' '}
                <Typography component="span" color="secondary">
                  {currentPhrase.category}
                </Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <Typography variant="h6" textAlign="center" gutterBottom color="text.primary">
              所有禮貌用語
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(auto-fill, minmax(200px, 1fr))',
                  md: 'repeat(auto-fill, minmax(250px, 1fr))',
                },
                gap: 1.5,
              }}
            >
              {politenessPhrases.map((phrase, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    bgcolor: 'grey.50',
                    transition: (theme) => theme.transitions.create(['box-shadow', 'transform']),
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <Typography display="block" fontWeight={600} fontSize={16} gutterBottom>
                    {phrase.character}
                  </Typography>
                  <Typography display="block" fontSize={14} color="text.secondary" gutterBottom>
                    {phrase.jyutping}
                  </Typography>
                  <Typography display="block" fontSize={13} color="text.disabled">
                    {phrase.meaning}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  )
}

export default PolitenessPractice
