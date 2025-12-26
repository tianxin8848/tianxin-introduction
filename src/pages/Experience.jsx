import { useTranslation } from 'react-i18next'
import './Experience.css'

function Experience() {
  const { t } = useTranslation()
  const experiences = t('experience.items', { returnObjects: true })
  
  return (
    <div className="experience">
      <div className="container">
        <h1 className="page-title">{t('experience.title')}</h1>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h2 className="experience-title">{exp.title}</h2>
                <span className="experience-period">{exp.period}</span>
              </div>
              <p className="experience-description">{exp.description}</p>
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience

