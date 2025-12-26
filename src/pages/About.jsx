import { useTranslation } from 'react-i18next'
import './About.css'

function About() {
  const { t } = useTranslation()
  
  return (
    <div className="about">
      <div className="container">
        <h1 className="page-title">{t('about.title')}</h1>
        
        <div className="about-content">
          <div className="about-section">
            <h2>{t('about.profile.title')}</h2>
            <p>
              {t('about.profile.content')}
            </p>
          </div>
          
          <div className="about-section">
            <h2>{t('about.interests.title')}</h2>
            <ul className="interest-list">
              {t('about.interests.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="about-section">
            <h2>{t('about.education.title')}</h2>
            <div className="education-item">
              <h3>{t('about.education.degree')}</h3>
              <p>{t('about.education.description')}</p>
            </div>
          </div>
          
          <div className="about-section">
            <h2>{t('about.traits.title')}</h2>
            <p>
              {t('about.traits.content')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

