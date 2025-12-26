import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Home.css'

function Home() {
  const { t } = useTranslation()
  
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
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

