import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Mode } from '../../types'

interface ModeToggleProps {
  mode: Mode
  switchMode: (nextMode: Mode) => void
  sidebarCollapsed: boolean
}

const modes: { value: Mode; short: string; label: string; hint: string }[] = [
  { value: 'reference', short: '參', label: '參考模式', hint: '參考模式' },
  { value: 'advanced', short: '進', label: '進階模式', hint: '進階模式' },
  { value: 'lyrics', short: '歌', label: '歌詞模式', hint: '歌詞模式' },
  { value: 'politeness', short: '禮', label: '禮貌用語', hint: '禮貌用語' },
]

function ModeToggle({ mode, switchMode, sidebarCollapsed }: ModeToggleProps) {
  const isNarrow = useMediaQuery('(max-width:768px)')

  if (isNarrow && sidebarCollapsed) {
    return null
  }

  const vertical = !isNarrow

  return (
    <Box
      sx={{
        width: '100%',
        mb: 2.5,
        alignSelf: sidebarCollapsed ? 'center' : 'stretch',
      }}
    >
      <Tabs
        value={mode}
        onChange={(_, v) => switchMode(v as Mode)}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'scrollable'}
        scrollButtons={vertical ? false : 'auto'}
        allowScrollButtonsMobile
        aria-label="練習模式"
        sx={{
          ...(vertical && {
            '& .MuiTabs-indicator': {
              left: 0,
              right: 'auto',
              width: 3,
              borderRadius: '0 2px 2px 0',
            },
          }),
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: vertical && sidebarCollapsed ? 12 : 14,
            minHeight: vertical && sidebarCollapsed ? 40 : vertical ? 44 : 42,
            ...(vertical &&
              sidebarCollapsed && {
                minWidth: 40,
                px: 0,
              }),
            ...(vertical &&
              !sidebarCollapsed && {
                alignItems: 'flex-start',
                textAlign: 'left',
              }),
          },
        }}
      >
        {modes.map((m) => (
          <Tab
            key={m.value}
            value={m.value}
            label={vertical && sidebarCollapsed ? m.short : m.label}
            title={m.hint}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ModeToggle
