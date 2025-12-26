import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routes } from './routes'
import './App.css'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ]
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  
  return (
    <div className="language-switcher">
      <select 
        value={i18n.language} 
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()
  
  // 过滤掉不需要在导航中显示的路由（如果需要的话）
  const navRoutes = routes.filter(route => route.navKey)
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          田欣
        </Link>
        <ul className="nav-menu">
          {navRoutes.map((route) => (
            <li key={route.key}>
              <Link 
                to={route.path} 
                className={location.pathname === route.path ? 'nav-link active' : 'nav-link'}
              >
                {t(route.navKey)}
              </Link>
            </li>
          ))}
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

function App() {
  const { t } = useTranslation()
  
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            {routes.map((route) => {
              const Component = route.element
              return (
                <Route 
                  key={route.key} 
                  path={route.path} 
                  element={<Component />} 
                />
              )
            })}
          </Routes>
        </main>
        <footer className="footer">
          <p>{t('footer.copyright')}</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

