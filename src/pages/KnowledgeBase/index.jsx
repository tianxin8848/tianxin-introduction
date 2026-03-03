import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './index.css'

function KnowledgeBase() {
  const { t } = useTranslation()
  
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
      <section className="knowledge-hero">
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