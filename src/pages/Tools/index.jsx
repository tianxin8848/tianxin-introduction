import { useTranslation } from 'react-i18next'
import './index.css'

function Tools() {
  const { t } = useTranslation()
  
  // 城市配置
  const cities = t('tools.cities', { returnObjects: true })
  
  // 生成Google天气搜索链接
  const getGoogleWeatherUrl = (cityName, cityQuery) => {
    // 根据当前语言生成搜索关键词
    const searchQuery = encodeURIComponent(`${cityName}天气`)
    return `https://www.google.com/search?q=${searchQuery}&oq=${searchQuery}&ie=UTF-8`
  }
  
  return (
    <div className="tools">
      <div className="container">
        <h1 className="page-title">{t('tools.title')}</h1>
        <p className="tools-description">{t('tools.description')}</p>
        
        <div className="weather-grid">
          {cities.map((city) => {
            const googleUrl = getGoogleWeatherUrl(city.name, city.query)
            
            return (
              <a
                key={city.name}
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="weather-card-link"
              >
                <div className="weather-card">
                  <div className="weather-header">
                    <h2>{city.name}</h2>
                    <div className="weather-icon-large">🌤️</div>
                  </div>
                  
                  <div className="weather-content">
                    <p className="weather-hint">{t('tools.clickToSearch')}</p>
                    <div className="weather-link-icon">🔍</div>
                  </div>
                  
                  <div className="weather-footer">
                    <span className="link-text">{t('tools.viewWeather')} →</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tools
