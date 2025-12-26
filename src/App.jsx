import { useState, useEffect, useRef } from 'react'
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
          Xin Tian
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

function TimeDisplay() {
  const [beijingTime, setBeijingTime] = useState('')
  const [usTime, setUsTime] = useState('')
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // 北京时间 (UTC+8)
      setBeijingTime(now.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }))
      
      // 美国东部时间 (UTC-5/-4)
      setUsTime(now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="time-display">
      <div className="time-item">
        <span className="time-label">北京时间:</span>
        <span className="time-value">{beijingTime}</span>
      </div>
      <div className="time-item">
        <span className="time-label">美国时间:</span>
        <span className="time-value">{usTime}</span>
      </div>
    </div>
  )
}

function App() {
  const { t } = useTranslation()
  const [showNav, setShowNav] = useState(true)
  const mouseTimerRef = useRef(null)
  
  useEffect(() => {
    const handleMouseMove = () => {
      // 显示导航栏
      setShowNav(true)
      
      // 清除之前的定时器
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current)
      }
      
      // 设置新的定时器：3秒无鼠标活动后隐藏导航栏
      mouseTimerRef.current = setTimeout(() => {
        setShowNav(false)
      }, 3000)
    }
    
    // 初始设置定时器
    mouseTimerRef.current = setTimeout(() => {
      setShowNav(false)
    }, 3000)
    
    // 添加鼠标移动事件监听
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseMove)
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current)
      }
    }
  }, [])
  
  return (
    <Router>
      <div className="App">
        {showNav ? (
          <Navigation />
        ) : (
          <div className="time-navbar">
            <TimeDisplay />
          </div>
        )}
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

