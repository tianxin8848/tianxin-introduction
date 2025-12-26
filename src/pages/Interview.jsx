import { useTranslation } from 'react-i18next'
import './Interview.css'

function Interview() {
  const { t } = useTranslation()
  
  const resources = t('interview.resources', { returnObjects: true })
  
  return (
    <div className="interview">
      <div className="container">
        <h1 className="page-title">{t('interview.title')}</h1>
        
        <div className="interview-content">
          <div className="interview-intro">
            <p>{t('interview.description')}</p>
          </div>
          
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">
                  {resource.type === 'website' ? '🌐' : '📺'}
                </div>
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  {t('interview.visitLink')} →
                </a>
              </div>
            ))}
          </div>
          
          <div className="interview-tips">
            <h2>{t('interview.tips.title')}</h2>
            <ul className="tips-list">
              {t('interview.tips.items', { returnObjects: true }).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview

