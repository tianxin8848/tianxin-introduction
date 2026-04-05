import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

const referenceSections = [
  {
    title: '聲',
    items: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'ng', 'h', 'gw', 'kw', 'w', 'z', 'c', 's', 'j'],
  },
  {
    title: '韻',
    items: ['aa', 'a', 'e', 'i', 'o', 'u', 'oe', 'eo', 'yu', 'm', 'ng'],
  },
  {
    title: '尾',
    items: ['i', 'u', 'm', 'n', 'ng', 'p', 't', 'k'],
  },
]

function a11yProps(index: number) {
  return {
    id: `reference-tab-${index}`,
    'aria-controls': `reference-tabpanel-${index}`,
  } as const
}

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reference-tabpanel-${index}`}
      aria-labelledby={`reference-tab-${index}`}
      {...other}
    >
      {value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null}
    </div>
  )
}

function ReferenceSections() {
  const [tab, setTab] = useState(0)

  return (
    <Paper
      component="section"
      elevation={1}
      aria-label="聲韻尾參考"
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 760,
        borderRadius: 2,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          aria-label="聲韻尾分類"
          variant="fullWidth"
        >
          {referenceSections.map((s, i) => (
            <Tab key={s.title} label={s.title} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {referenceSections.map((section, index) => (
        <TabPanel key={section.title} value={tab} index={index}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
            {section.items.map((item) =>
              section.title === '韻' ? (
                <Chip
                  key={`${section.title}-${item}`}
                  label={item}
                  component={NavLink}
                  to={`/m/finals/${item}`}
                  clickable
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 34,
                    height: 34,
                    fontWeight: 600,
                    bgcolor: 'grey.100',
                    borderColor: 'grey.600',
                    '&[aria-current="page"]': {
                      bgcolor: 'success.50',
                      borderColor: 'success.main',
                      color: 'success.dark',
                    },
                  }}
                />
              ) : (
                <Typography
                  key={`${section.title}-${item}`}
                  component="span"
                  variant="body2"
                  sx={{
                    minWidth: 34,
                    height: 34,
                    px: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: 'grey.600',
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </Typography>
              ),
            )}
          </Box>
        </TabPanel>
      ))}
    </Paper>
  )
}

export default ReferenceSections
