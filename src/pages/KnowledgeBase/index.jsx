import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './index.css'

function KnowledgeBase() {
  const { t } = useTranslation()
  
  // 彩虹色数组
  const rainbowColors = [
    'linear-gradient(135deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 56%, #4b0082 70%, #8b00ff 84%)',
    'linear-gradient(135deg, #8b00ff 0%, #ff0000 14%, #ff7f00 28%, #ffff00 42%, #00ff00 56%, #0000ff 70%, #4b0082 84%)',
    'linear-gradient(135deg, #4b0082 0%, #8b00ff 14%, #ff0000 28%, #ff7f00 42%, #ffff00 56%, #00ff00 70%, #0000ff 84%)',
    'linear-gradient(135deg, #0000ff 0%, #4b0082 14%, #8b00ff 28%, #ff0000 42%, #ff7f00 56%, #ffff00 70%, #00ff00 84%)',
    'linear-gradient(135deg, #00ff00 0%, #0000ff 14%, #4b0082 28%, #8b00ff 42%, #ff0000 56%, #ff7f00 70%, #ffff00 84%)',
    'linear-gradient(135deg, #ffff00 0%, #00ff00 14%, #0000ff 28%, #4b0082 42%, #8b00ff 56%, #ff0000 70%, #ff7f00 84%)',
    'linear-gradient(135deg, #ff7f00 0%, #ffff00 14%, #00ff00 28%, #0000ff 42%, #4b0082 56%, #8b00ff 70%, #ff0000 84%)'
  ]
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  
  // 每小时切换一次彩虹色
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % rainbowColors.length)
    }, 3600000) // 3600000毫秒 = 1小时
    
    return () => clearInterval(interval)
  }, [])
  
  // 知识库分类数据
  const categories = [
    {
      id: 'frontend',
      title: t('knowledgeBase.categories.frontend.title'),
      description: t('knowledgeBase.categories.frontend.description'),
      icon: '📱',
      topics: [
        t('knowledgeBase.categories.frontend.topics.js'),
        t('knowledgeBase.categories.frontend.topics.react'),
        t('knowledgeBase.categories.frontend.topics.css'),
        t('knowledgeBase.categories.frontend.topics.html')
      ]
    },
    {
      id: 'backend',
      title: t('knowledgeBase.categories.backend.title'),
      description: t('knowledgeBase.categories.backend.description'),
      icon: '⚙️',
      topics: [
        t('knowledgeBase.categories.backend.topics.nodejs'),
        t('knowledgeBase.categories.backend.topics.express'),
        t('knowledgeBase.categories.backend.topics.database'),
        t('knowledgeBase.categories.backend.topics.api')
      ]
    },
    {
      id: 'devops',
      title: t('knowledgeBase.categories.devops.title'),
      description: t('knowledgeBase.categories.devops.description'),
      icon: '🔧',
      topics: [
        t('knowledgeBase.categories.devops.topics.git'),
        t('knowledgeBase.categories.devops.topics.docker'),
        t('knowledgeBase.categories.devops.topics.ci'),
        t('knowledgeBase.categories.devops.topics.cloud')
      ]
    },
    {
      id: 'ai',
      title: t('knowledgeBase.categories.ai.title'),
      description: t('knowledgeBase.categories.ai.description'),
      icon: '🤖',
      topics: [
        t('knowledgeBase.categories.ai.topics.ml'),
        t('knowledgeBase.categories.ai.topics.nn'),
        t('knowledgeBase.categories.ai.topics.nlp'),
        t('knowledgeBase.categories.ai.topics.cv')
      ]
    }
  ]
  
  // 精选文章
  const featuredArticles = [
    {
      id: 1,
      title: t('knowledgeBase.articles.reactBasics.title'),
      description: t('knowledgeBase.articles.reactBasics.description'),
      category: 'frontend',
      readTime: '10分钟'
    },
    {
      id: 2,
      title: t('knowledgeBase.articles.nodejsSetup.title'),
      description: t('knowledgeBase.articles.nodejsSetup.description'),
      category: 'backend',
      readTime: '15分钟'
    },
    {
      id: 3,
      title: t('knowledgeBase.articles.gitBestPractices.title'),
      description: t('knowledgeBase.articles.gitBestPractices.description'),
      category: 'devops',
      readTime: '8分钟'
    }
  ]
  
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  return (
    <div className="knowledge-base">
      <section className="knowledge-hero" style={{ background: rainbowColors[currentColorIndex] }}>
        <div className="container">
          <h1 className="hero-title">{t('knowledgeBase.title')}</h1>
          <p className="hero-description">{t('knowledgeBase.description')}</p>
        </div>
      </section>
      
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">{t('knowledgeBase.categories.title')}</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-topics">
                  {category.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="featured-articles">
        <div className="container">
          <h2 className="section-title">{t('knowledgeBase.featuredArticles.title')}</h2>
          <div className="articles-grid">
            {featuredArticles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-category">{article.category}</div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <div className="article-meta">
                  <span className="read-time">{article.readTime}</span>
                  <Link to={`/knowledge-base/article/${article.id}`} className="read-more">
                    {t('knowledgeBase.articles.readMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="learning-paths">
        <div className="container">
          <h2 className="section-title">{t('knowledgeBase.learningPaths.title')}</h2>
          <div className="paths-container">
            <div className="learning-path">
              <div className="path-icon">🚀</div>
              <h3 className="path-title">{t('knowledgeBase.learningPaths.frontend.title')}</h3>
              <p className="path-description">{t('knowledgeBase.learningPaths.frontend.description')}</p>
              <Link to="/knowledge-base/path/frontend" className="path-link">
                {t('knowledgeBase.learningPaths.start')}
              </Link>
            </div>
            <div className="learning-path">
              <div className="path-icon">💻</div>
              <h3 className="path-title">{t('knowledgeBase.learningPaths.fullStack.title')}</h3>
              <p className="path-description">{t('knowledgeBase.learningPaths.fullStack.description')}</p>
              <Link to="/knowledge-base/path/fullstack" className="path-link">
                {t('knowledgeBase.learningPaths.start')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KnowledgeBase