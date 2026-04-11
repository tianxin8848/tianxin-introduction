import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import './index.css'
import App from './App.tsx'
import OrderTable from './modules/test/order'
import { appTheme } from './theme'
import { moduleHref, PRACTICE_MODULES } from './registry'

function LegacyFinalRedirect() {
  const { final } = useParams<{ final: string }>()
  return <Navigate to={`/m/finals/${final}`} replace />
}

const defaultModulePath = moduleHref(PRACTICE_MODULES[0])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={defaultModulePath} replace />} />
            <Route path="/final/:final" element={<LegacyFinalRedirect />} />
            <Route path="/testlist" element={<OrderTable />} />
            <Route path="/m/:moduleId/:segment?" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
