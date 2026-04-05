import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import { PRACTICE_MODULES, moduleHref, type PracticeModuleDefinition } from '../../registry'

interface ModuleNavProps {
  sidebarCollapsed: boolean
}

function activeModuleFromPath(pathname: string): PracticeModuleDefinition | undefined {
  return PRACTICE_MODULES.find((m) => pathname.startsWith(`/m/${m.pathSegment}`))
}

function ModuleNav({ sidebarCollapsed }: ModuleNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isNarrow = useMediaQuery('(max-width:768px)')

  if (isNarrow && sidebarCollapsed) {
    return null
  }

  const active = activeModuleFromPath(location.pathname)
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
        value={active?.pathSegment ?? false}
        onChange={(_, pathSegment) => {
          const mod = PRACTICE_MODULES.find((m) => m.pathSegment === pathSegment)
          if (mod) navigate(moduleHref(mod))
        }}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'scrollable'}
        scrollButtons={vertical ? false : 'auto'}
        allowScrollButtonsMobile
        aria-label="練習模塊"
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
        {PRACTICE_MODULES.map((m) => (
          <Tab
            key={m.pathSegment}
            value={m.pathSegment}
            label={vertical && sidebarCollapsed ? m.navShort : m.title}
            title={m.hint}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ModuleNav
