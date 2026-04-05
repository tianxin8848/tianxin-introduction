import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { FinalsPracticeVariant } from '../../types'

interface FinalsVariantToggleProps {
  variant: FinalsPracticeVariant
  setVariant: (v: FinalsPracticeVariant) => void
  sidebarCollapsed: boolean
}

const variants: { value: FinalsPracticeVariant; short: string; label: string; hint: string }[] = [
  { value: 'reference', short: '參', label: '參考模式', hint: '參考模式' },
  { value: 'advanced', short: '進', label: '進階模式', hint: '進階模式' },
]

function FinalsVariantToggle({ variant, setVariant, sidebarCollapsed }: FinalsVariantToggleProps) {
  const isNarrow = useMediaQuery('(max-width:768px)')

  if (isNarrow && sidebarCollapsed) {
    return null
  }

  const vertical = !isNarrow

  return (
    <Box
      sx={{
        width: '100%',
        mb: 1.5,
        alignSelf: sidebarCollapsed ? 'center' : 'stretch',
      }}
    >
      <Tabs
        value={variant}
        onChange={(_, v) => setVariant(v as FinalsPracticeVariant)}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'scrollable'}
        scrollButtons={vertical ? false : 'auto'}
        allowScrollButtonsMobile
        aria-label="韻母練習難度"
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
            fontSize: vertical && sidebarCollapsed ? 12 : 13,
            minHeight: vertical && sidebarCollapsed ? 36 : vertical ? 40 : 40,
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
        {variants.map((v) => (
          <Tab
            key={v.value}
            value={v.value}
            label={vertical && sidebarCollapsed ? v.short : v.label}
            title={v.hint}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default FinalsVariantToggle
