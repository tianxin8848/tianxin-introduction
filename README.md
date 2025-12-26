# 田欣的自我介绍

一个使用 React 和 React Router 构建的个人介绍网站。

## 功能特性

- 🏠 首页：欢迎页面和快速导航
- 👤 关于我：个人简介、兴趣爱好、教育背景
- 💼 技能专长：展示技术技能和熟练程度
- 📚 工作经历：项目经验和成就
- 📧 联系我：联系方式和留言表单
- 🌐 多语言支持：支持中文、英语、日语、韩语四种语言切换

## 技术栈

- React 18
- React Router DOM 6
- i18next & react-i18next (多语言支持)
- Vite
- CSS3

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
myreact-tase/
├── src/
│   ├── locales/              # 多语言翻译文件
│   │   ├── zh.json           # 中文
│   │   ├── en.json           # 英语
│   │   ├── ja.json           # 日语
│   │   └── ko.json           # 韩语
│   ├── pages/
│   │   ├── Home.jsx          # 首页
│   │   ├── About.jsx         # 关于我
│   │   ├── Skills.jsx        # 技能专长
│   │   ├── Experience.jsx    # 工作经历
│   │   └── Contact.jsx       # 联系我
│   ├── App.jsx               # 主应用组件（包含路由和语言切换）
│   ├── main.jsx              # 入口文件
│   ├── i18n.js               # i18n 配置文件
│   ├── App.css               # 应用样式
│   └── index.css             # 全局样式
├── index.html                # HTML 模板
├── package.json              # 项目配置
└── vite.config.js            # Vite 配置
```

## 路由配置

- `/` - 首页
- `/about` - 关于我
- `/skills` - 技能专长
- `/experience` - 工作经历
- `/contact` - 联系我

## 多语言功能

项目支持四种语言：
- 🇨🇳 中文 (zh)
- 🇺🇸 English (en)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)

### 语言切换

在导航栏右侧有语言选择器，可以随时切换语言。语言偏好会自动保存到浏览器本地存储。

### 修改翻译内容

所有翻译文本都存储在 `src/locales/` 目录下的 JSON 文件中：
- `zh.json` - 中文翻译
- `en.json` - 英语翻译
- `ja.json` - 日语翻译
- `ko.json` - 韩语翻译

你可以直接编辑这些 JSON 文件来修改翻译内容。JSON 文件的结构与页面结构对应，便于维护。

## 自定义

你可以根据需要修改各个页面组件的内容，更新个人信息、技能、经历等。如果需要添加新的翻译文本，只需在四个语言 JSON 文件中添加对应的键值对即可。

