import { useTranslation } from 'react-i18next'
import './index.css'

function Skills() {
  const { t } = useTranslation()
  
  const skillLevels = {
    frontend: [85, 90, 88, 75, 70],
    backend: [80, 75, 70, 75],
    tools: [85, 70, 80, 65]
  }
  
  const skillCategories = [
    {
      key: 'frontend',
      title: t('skills.categories.frontend.title'),
      skills: t('skills.categories.frontend.skills', { returnObjects: true })
    },
    {
      key: 'backend',
      title: t('skills.categories.backend.title'),
      skills: t('skills.categories.backend.skills', { returnObjects: true })
    },
    {
      key: 'tools',
      title: t('skills.categories.tools.title'),
      skills: t('skills.categories.tools.skills', { returnObjects: true })
    }
  ]
  
  return (
    <div className="skills">
      <div className="container">
        <h1 className="page-title">{t('skills.title')}</h1>
        
        <div className="skills-content">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h2 className="category-title">{category.title}</h2>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill}</span>
                      <span className="skill-percentage">{skillLevels[category.key][skillIndex]}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skillLevels[category.key][skillIndex]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills

