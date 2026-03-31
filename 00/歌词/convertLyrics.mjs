import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取输入文件
const inputFile = path.join(__dirname, 'geci.txt');
const outputFile = path.join(__dirname, 'geci.js');

// 判断字符是否为标点符号
function isPunctuation(char) {
  const punctuationRegex = /[，。！？、；：'"「」『』【】《》〈〉（）［］｛｝﹁﹂﹃﹄﹙﹚﹛﹜﹝﹞…—～‧]/;
  return punctuationRegex.test(char);
}

// 清理粤拼：移除音调数字和斜杠变体
function cleanJyutping(jyutping) {
  if (!jyutping) return '';
  
  // 如果有斜杠分隔的变体，取第一个
  let cleaned = jyutping.split('/')[0];
  
  // 移除音调数字（1-6）
  cleaned = cleaned.replace(/[1-6]/g, '');
  
  // 移除末尾的斜杠
  cleaned = cleaned.replace(/\/$/, '');
  
  return cleaned;
}

// 从HTML中提取歌词和粤拼
function extractLyricsFromHTML(htmlContent) {
  const lyrics = [];
  
  // 使用正则表达式提取<p>标签内容
  const pTagRegex = /<p>(.*?)<\/p>/gs;
  let match;
  
  while ((match = pTagRegex.exec(htmlContent)) !== null) {
    const pContent = match[1];
    
    // 分割中文和粤拼（粤拼在<br>标签后）
    const parts = pContent.split('<br>');
    
    if (parts.length >= 2) {
      const chineseText = parts[0].trim();
      const jyutpingText = parts[1].trim();
      
      // 移除粤拼中的HTML标签和链接
      const cleanJyutpingText = jyutpingText
        .replace(/<[^>]*>/g, '') // 移除HTML标签
        .replace(/https?:\/\/[^\s]+/g, '') // 移除URL
        .replace(/翡翠粤语歌词/g, '') // 移除特定文本
        .trim();
      
      lyrics.push({
        chinese: chineseText,
        jyutping: cleanJyutpingText
      });
    }
  }
  
  return lyrics;
}

// 将歌词转换为token数组
function convertToTokens(lyrics) {
  const tokens = [];
  
  for (const lyric of lyrics) {
    const chineseChars = lyric.chinese.split('');
    const jyutpingParts = lyric.jyutping.split(' ');
    
    let jyutpingIndex = 0;
    
    for (let i = 0; i < chineseChars.length; i++) {
      const char = chineseChars[i];
      
      // 跳过空格
      if (char === ' ') continue;
      
      if (isPunctuation(char)) {
        tokens.push({
          character: char,
          jyutping: '',
          isPunctuation: true
        });
      } else {
        // 获取对应的粤拼
        let jyutping = '';
        if (jyutpingIndex < jyutpingParts.length) {
          jyutping = cleanJyutping(jyutpingParts[jyutpingIndex]);
          jyutpingIndex++;
        }
        
        tokens.push({
          character: char,
          jyutping: jyutping
        });
      }
    }
  }
  
  return tokens;
}

// 生成TypeScript输出
function generateTypeScriptOutput(tokens) {
  let output = `import type { LyricToken } from './types'\n\n`;
  output += `export const lyricTokens: LyricToken[] = [\n`;
  
  tokens.forEach((token, index) => {
    const isLast = index === tokens.length - 1;
    let line = `  { character: '${token.character}', jyutping: '${token.jyutping}'`;
    
    if (token.isPunctuation) {
      line += `, isPunctuation: true }`;
    } else {
      line += ` }`;
    }
    
    if (!isLast) {
      line += `,`;
    }
    
    output += line + `\n`;
  });
  
  output += `]\n`;
  
  return output;
}

// 主函数
function main() {
  try {
    console.log('正在读取输入文件...');
    const inputContent = fs.readFileSync(inputFile, 'utf8');
    
    console.log('正在提取歌词数据...');
    const lyrics = extractLyricsFromHTML(inputContent);
    
    console.log(`提取到 ${lyrics.length} 段歌词`);
    
    console.log('正在转换为token数组...');
    const tokens = convertToTokens(lyrics);
    
    console.log(`生成 ${tokens.length} 个token`);
    
    console.log('正在生成TypeScript输出...');
    const outputContent = generateTypeScriptOutput(tokens);
    
    console.log('正在写入输出文件...');
    fs.writeFileSync(outputFile, outputContent, 'utf8');
    
    console.log(`转换完成！输出已保存到: ${outputFile}`);
    
    // 显示前几个token作为示例
    console.log('\n前10个token示例:');
    tokens.slice(0, 10).forEach((token, i) => {
      console.log(`  ${i + 1}. ${token.character} -> ${token.jyutping} ${token.isPunctuation ? '(标点)' : ''}`);
    });
    
  } catch (error) {
    console.error('转换过程中发生错误:', error);
    process.exit(1);
  }
}

// 执行主函数
main();

export {
  extractLyricsFromHTML,
  convertToTokens,
  cleanJyutping,
  isPunctuation
};