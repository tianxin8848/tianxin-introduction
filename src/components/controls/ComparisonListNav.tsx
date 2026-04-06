import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate, useParams } from 'react-router-dom'
import {
  COMPARISON_DEFAULT_LIST_ID,
  getComparisonListTabs,
  isComparisonListId,
  type ComparisonListId,
} from '../../modules/comparison/comparisonListRegistry'

interface ComparisonListNavProps {
  sidebarCollapsed: boolean
}

function ComparisonListNav({ sidebarCollapsed }: ComparisonListNavProps) {
  const listTabs = getComparisonListTabs()
  const navigate = useNavigate()
  const { segment } = useParams<{ segment?: string }>()
  const isNarrow = useMediaQuery('(max-width:768px)')

  if (isNarrow && sidebarCollapsed) {
    return null
  }

  const vertical = !isNarrow
  const value =
    segment && isComparisonListId(segment) ? segment : COMPARISON_DEFAULT_LIST_ID

  return (
    <Box
      sx={{
        width: '100%',
        mb: 1.5,
        alignSelf: sidebarCollapsed ? 'center' : 'stretch',
      }}
    >
      <Tabs
        value={value}
        onChange={(_, id: ComparisonListId) => navigate(`/m/comparison/${id}`)}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'scrollable'}
        scrollButtons={vertical ? false : 'auto'}
        allowScrollButtonsMobile
        aria-label="普粵對照子列表"
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
        {listTabs.map((t) => (
          <Tab
            key={t.id}
            value={t.id}
            label={vertical && sidebarCollapsed ? t.short : t.label}
            title={t.label}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default ComparisonListNav
