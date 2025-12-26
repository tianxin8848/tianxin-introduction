import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Home.css'

function Home() {
  const { t } = useTranslation()
  
  // 4张向日葵图片 - 直接使用路径，Vite会自动处理
  const images = [
    '/生成向日葵花海图片 (1).png',
    '/生成向日葵花海图片 (2).png',
    '/生成向日葵花海图片 (3).png',
    '/生成向日葵花海图片.png'
  ]
  
  const [imagesLoaded, setImagesLoaded] = useState(false)
  
  // 预加载所有图片
  useEffect(() => {
    let loadedCount = 0
    const totalImages = images.length
    
    images.forEach((img, index) => {
      const imageElement = new Image()
      imageElement.onload = () => {
        loadedCount++
        console.log(`✓ 图片 ${index + 1} 加载成功:`, img)
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
          console.log('所有图片加载完成')
        }
      }
      imageElement.onerror = () => {
        console.error(`✗ 图片 ${index + 1} 加载失败:`, img)
        // 即使有图片加载失败，也继续显示
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      imageElement.src = img
    })
  }, [])
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 图片轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length
        console.log('切换到图片:', nextIndex, images[nextIndex]) // 调试信息
        return nextIndex
      })
    }, 3000) // 每3秒切换一张图片
    
    return () => clearInterval(interval)
  }, [images])
  
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background-container">
          {images.map((image, index) => {
            const isActive = index === currentImageIndex
            return (
              <div
                key={`image-${index}`}
                className={`hero-background ${isActive ? 'active' : ''} ${imagesLoaded ? 'loaded' : ''}`}
                style={{
                  backgroundImage: `url("${image}")`,
                  zIndex: isActive ? 1 : 0
                }}
                data-index={index}
              />
            )
          })}
          {/* 图片指示点 */}
          <div className="image-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`切换到第 ${index + 1} 张图片`}
              />
            ))}
          </div>
        </div>
        <div className="hero-content">
          <div className="welcome-greetings">
            <span className="greeting-item">환영합니다</span>
            <span className="greeting-separator">|</span>
            <span className="greeting-item">欢迎光临</span>
            <span className="greeting-separator">|</span>
            <span className="greeting-item">いらっしゃいませ</span>
          </div>
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <p className="hero-description">
            {t('home.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">
              {t('home.learnMore')}
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              {t('home.contactMe')}
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2 className="section-title">{t('home.quickNav')}</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>{t('home.aboutCard.title')}</h3>
              <p>{t('home.aboutCard.description')}</p>
              <Link to="/about" className="feature-link">{t('home.aboutCard.link')}</Link>
            </div>
            <div className="feature-card">
              <h3>{t('home.skillsCard.title')}</h3>
              <p>{t('home.skillsCard.description')}</p>
              <Link to="/skills" className="feature-link">{t('home.skillsCard.link')}</Link>
            </div>
            <div className="feature-card">
              <h3>{t('home.experienceCard.title')}</h3>
              <p>{t('home.experienceCard.description')}</p>
              <Link to="/experience" className="feature-link">{t('home.experienceCard.link')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

