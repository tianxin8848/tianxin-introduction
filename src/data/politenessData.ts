import type { PolitenessPhrase } from '../types'

export const politenessPhrases: PolitenessPhrase[] = [
  // 问候语
  {
    character: '你好',
    jyutping: 'nei5 hou2',
    meaning: 'Hello',
    category: 'greeting'
  },
  {
    character: '早晨',
    jyutping: 'zou2 san4',
    meaning: 'Good morning',
    category: 'greeting'
  },
  {
    character: '午安',
    jyutping: 'ng5 on1',
    meaning: 'Good afternoon',
    category: 'greeting'
  },
  {
    character: '晚安',
    jyutping: 'maan5 on1',
    meaning: 'Good night',
    category: 'greeting'
  },
  
  // 感谢语
  {
    character: '唔該',
    jyutping: 'm4 goi1',
    meaning: 'Thank you (for service)',
    category: 'thanks'
  },
  {
    character: '多謝',
    jyutping: 'do1 ze6',
    meaning: 'Thank you (for gift)',
    category: 'thanks'
  },
  {
    character: '多謝晒',
    jyutping: 'do1 ze6 saai3',
    meaning: 'Thank you very much',
    category: 'thanks'
  },
  
  // 道歉语
  {
    character: '對唔住',
    jyutping: 'deoi3 m4 zyu6',
    meaning: 'Sorry',
    category: 'apology'
  },
  {
    character: '唔好意思',
    jyutping: 'm4 hou2 ji3 si1',
    meaning: 'Excuse me / I\'m sorry',
    category: 'apology'
  },
  
  // 请求语
  {
    character: '請問',
    jyutping: 'cing2 man6',
    meaning: 'May I ask',
    category: 'request'
  },
  {
    character: '可唔可以',
    jyutping: 'ho2 m4 ho2 ji5',
    meaning: 'Can I / May I',
    category: 'request'
  },
  {
    character: '麻煩你',
    jyutping: 'maa4 faan4 nei5',
    meaning: 'Could you please',
    category: 'request'
  },
  
  // 告别语
  {
    character: '拜拜',
    jyutping: 'baai1 baai3',
    meaning: 'Bye bye',
    category: 'farewell'
  },
  {
    character: '再見',
    jyutping: 'zoi3 gin3',
    meaning: 'Goodbye',
    category: 'farewell'
  },
  {
    character: '聽日見',
    jyutping: 'ting1 jat6 gin3',
    meaning: 'See you tomorrow',
    category: 'farewell'
  },
  
  // 祝福语
  {
    character: '恭喜',
    jyutping: 'gung1 hei2',
    meaning: 'Congratulations',
    category: 'blessing'
  },
  {
    character: '身體健康',
    jyutping: 'san1 tai2 gin6 hong1',
    meaning: 'Good health',
    category: 'blessing'
  },
  {
    character: '新年快樂',
    jyutping: 'san1 nin4 faai3 lok6',
    meaning: 'Happy New Year',
    category: 'blessing'
  }
]
