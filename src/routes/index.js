import Home from '../pages/Home'
import About from '../pages/About'
import Skills from '../pages/Skills'
import Experience from '../pages/Experience'
import Contact from '../pages/Contact'
import Interview from '../pages/Interview'

// 路由配置
export const routes = [
  {
    path: '/',
    element: Home,
    key: 'home',
    navKey: 'nav.home'
  },
  {
    path: '/about',
    element: About,
    key: 'about',
    navKey: 'nav.about'
  },
  {
    path: '/skills',
    element: Skills,
    key: 'skills',
    navKey: 'nav.skills'
  },
  {
    path: '/experience',
    element: Experience,
    key: 'experience',
    navKey: 'nav.experience'
  },
  {
    path: '/contact',
    element: Contact,
    key: 'contact',
    navKey: 'nav.contact'
  },
  {
    path: '/interview',
    element: Interview,
    key: 'interview',
    navKey: 'nav.interview'
  }
]

// 导出路由配置供其他组件使用
export default routes

