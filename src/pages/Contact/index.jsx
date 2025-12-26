import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './index.css'

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t('contact.form.success'))
    setFormData({ name: '', email: '', message: '' })
  }
  
  return (
    <div className="contact">
      <div className="container">
        <h1 className="page-title">{t('contact.title')}</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>{t('contact.info.title')}</h2>
            <div className="contact-item">
              <h3>{t('contact.info.email')}</h3>
              <p>tianxin@example.com</p>
            </div>
            <div className="contact-item">
              <h3>{t('contact.info.phone')}</h3>
              <p>+86 138-0000-0000</p>
            </div>
            <div className="contact-item">
              <h3>{t('contact.info.address')}</h3>
              <p>{t('contact.info.addressValue')}</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>{t('contact.form.title')}</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

