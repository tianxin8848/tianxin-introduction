import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './index.css'

function Tools() {
  const { t } = useTranslation()
  
  // 城市配置
  const cities = t('tools.cities', { returnObjects: true })
  
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // 获取天气数据
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)
      
      const weatherPromises = cities.map(async (city) => {
        try {
          // 使用 wttr.in API (免费，无需 API key)
          // 添加超时和错误处理
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
          
          const response = await fetch(
            `https://wttr.in/${encodeURIComponent(city.query)}?format=j1&lang=${t('tools.apiLang')}`,
            {
              signal: controller.signal,
              headers: {
                'Accept': 'application/json'
              }
            }
          )
          
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            throw new Error(`Failed to fetch weather for ${city.name}`)
          }
          
          const data = await response.json()
          
          // 解析天气数据
          if (!data.current_condition || !data.weather) {
            throw new Error('Invalid weather data format')
          }
          
          const current = data.current_condition[0]
          const forecast = data.weather.slice(0, 4) // 今天 + 未来3天
          
          // 获取天气描述（支持多语言）
          const getCondition = (conditionArray) => {
            if (Array.isArray(conditionArray) && conditionArray.length > 0) {
              return conditionArray[0].value || 'N/A'
            }
            return 'N/A'
          }
          
          return {
            name: city.name,
            current: {
              temp: current.temp_C || current.tempC || 'N/A',
              condition: getCondition(current.lang) || getCondition(current.weatherDesc) || 'N/A',
              humidity: current.humidity || 'N/A',
              windSpeed: current.windspeedKmph || current.windspeedKph || 'N/A',
              icon: current.weatherCode || '113'
            },
            forecast: forecast.map((day, index) => {
              const hourly = day.hourly && day.hourly[4] ? day.hourly[4] : day.hourly?.[0] || {}
              return {
                date: day.date,
                dayName: index === 0 
                  ? t('tools.today') 
                  : new Date(day.date).toLocaleDateString(t('tools.dateLocale'), { weekday: 'short' }),
                maxTemp: day.maxtempC || day.maxtemp || 'N/A',
                minTemp: day.mintempC || day.mintemp || 'N/A',
                condition: getCondition(hourly.lang) || getCondition(hourly.weatherDesc) || 'N/A',
                icon: hourly.weatherCode || day.weatherCode || '113'
              }
            })
          }
        } catch (err) {
          if (err.name === 'AbortError') {
            console.error(`Timeout fetching weather for ${city.name}`)
          } else {
            console.error(`Error fetching weather for ${city.name}:`, err)
          }
          return {
            name: city.name,
            error: true
          }
        }
      })
      
      try {
        const results = await Promise.all(weatherPromises)
        const weatherMap = {}
        results.forEach((result) => {
          weatherMap[result.name] = result
        })
        setWeatherData(weatherMap)
      } catch (err) {
        setError(t('tools.fetchError'))
        console.error('Error fetching weather data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchWeatherData()
    
    // 每30分钟刷新一次
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [cities, t])
  
  const getWeatherIcon = (code) => {
    // 简单的天气图标映射
    const iconMap = {
      '113': '☀️', // 晴天
      '116': '⛅', // 部分多云
      '119': '☁️', // 多云
      '122': '☁️', // 阴天
      '143': '🌫️', // 雾
      '176': '🌦️', // 小雨
      '179': '🌨️', // 雪
      '182': '🌨️', // 雨夹雪
      '185': '🌧️', // 雨
      '200': '⛈️', // 雷暴
      '227': '🌨️', // 雪
      '230': '🌨️', // 暴雪
      '248': '🌫️', // 雾
      '260': '🌫️', // 浓雾
      '263': '🌦️', // 小雨
      '266': '🌧️', // 雨
      '281': '🌧️', // 冻雨
      '284': '🌧️', // 冻雨
      '293': '🌦️', // 小雨
      '296': '🌧️', // 雨
      '299': '🌧️', // 中雨
      '302': '🌧️', // 大雨
      '305': '🌧️', // 大雨
      '308': '🌧️', // 暴雨
      '311': '🌧️', // 冻雨
      '314': '🌧️', // 大雨
      '317': '🌧️', // 冻雨
      '320': '🌨️', // 雪
      '323': '🌨️', // 小雪
      '326': '🌨️', // 雪
      '329': '🌨️', // 雪
      '332': '🌨️', // 雪
      '335': '🌨️', // 大雪
      '338': '🌨️', // 雪
      '350': '🌨️', // 冰雹
      '353': '🌦️', // 小雨
      '356': '🌧️', // 大雨
      '359': '🌧️', // 暴雨
      '362': '🌨️', // 雨夹雪
      '365': '🌨️', // 雨夹雪
      '368': '🌨️', // 小雪
      '371': '🌨️', // 大雪
      '374': '🌨️', // 小雪
      '377': '🌨️', // 雪
      '386': '⛈️', // 雷暴
      '389': '⛈️', // 雷暴
      '392': '⛈️', // 雷暴
      '395': '⛈️' // 雷暴
    }
    return iconMap[code] || '🌤️'
  }
  
  if (loading) {
    return (
      <div className="tools">
        <div className="container">
          <h1 className="page-title">{t('tools.title')}</h1>
          <div className="loading">
            <p>{t('tools.loading')}</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="tools">
        <div className="container">
          <h1 className="page-title">{t('tools.title')}</h1>
          <div className="error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="tools">
      <div className="container">
        <h1 className="page-title">{t('tools.title')}</h1>
        <p className="tools-description">{t('tools.description')}</p>
        
        <div className="weather-grid">
          {cities.map((city) => {
            const weather = weatherData[city.name]
            
            if (!weather || weather.error) {
              return (
                <div key={city.name} className="weather-card error-card">
                  <h2>{city.name}</h2>
                  <p>{t('tools.loadError')}</p>
                </div>
              )
            }
            
            return (
              <div key={city.name} className="weather-card">
                <div className="weather-header">
                  <h2>{city.name}</h2>
                  <div className="weather-icon-large">
                    {getWeatherIcon(weather.current.icon)}
                  </div>
                </div>
                
                {/* 当前天气 */}
                <div className="current-weather">
                  <div className="current-temp">
                    {weather.current.temp}°C
                  </div>
                  <div className="current-condition">
                    {weather.current.condition}
                  </div>
                  <div className="weather-details">
                    <span>💧 {weather.current.humidity}%</span>
                    <span>💨 {weather.current.windSpeed} km/h</span>
                  </div>
                </div>
                
                {/* 未来3天预报 */}
                <div className="forecast">
                  <h3>{t('tools.forecast')}</h3>
                  <div className="forecast-list">
                    {weather.forecast.slice(1, 4).map((day, index) => (
                      <div key={index} className="forecast-item">
                        <div className="forecast-day">{day.dayName}</div>
                        <div className="forecast-icon">{getWeatherIcon(day.icon)}</div>
                        <div className="forecast-temp">
                          <span className="max-temp">{day.maxTemp}°</span>
                          <span className="min-temp">/{day.minTemp}°</span>
                        </div>
                        <div className="forecast-condition">{day.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tools

