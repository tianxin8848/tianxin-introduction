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
  // 中文标点符号
  const chinesePunctuation = /[，。！？、；：'"「」『』【】《》〈〉（）［］｛｝﹁﹂﹃﹄﹙﹚﹛﹜﹝﹞…—～‧]/;
  // 英文标点符号和空格
  const englishPunctuation = /[ ,.!?;:'"\[\]{}()\-]/;
  
  return chinesePunctuation.test(char) || englishPunctuation.test(char);
}

// 清理粤拼：移除音调数字和斜杠变体
function cleanJyutping(jyutping) {
  if (!jyutping) return '';
  
  // 如果有斜杠分隔的变体，取第一个
  let cleaned = jyutping.split('/')[0];
  
  // 移除所有数字（包括45这样的组合）
  cleaned = cleaned.replace(/\d+/g, '');
  
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
    const jyutpingParts = lyric.jyutping.split(' ').filter(part => part.trim() !== '');
    
    let jyutpingIndex = 0;
    
    for (let i = 0; i < chineseChars.length; i++) {
      const char = chineseChars[i];
      
      if (isPunctuation(char)) {
        tokens.push({
          character: char,
          jyutping: '',
          isPunctuation: true
        });
      } else if (char.trim() === '') {
        // 空格也作为标点处理
        tokens.push({
          character: ' ',
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
    
    // 显示提取的歌词示例
    console.log('\n第一段歌词示例:');
    if (lyrics.length > 0) {
      console.log(`中文: ${lyrics[0].chinese}`);
      console.log(`粤拼: ${lyrics[0].jyutping}`);
    }
    
    console.log('\n正在转换为token数组...');
    const tokens = convertToTokens(lyrics);
    
    console.log(`生成 ${tokens.length} 个token`);
    
    console.log('正在生成TypeScript输出...');
    const outputContent = generateTypeScriptOutput(tokens);
    
    console.log('正在写入输出文件...');
    fs.writeFileSync(outputFile, outputContent, 'utf8');
    
    console.log(`转换完成！输出已保存到: ${outputFile}`);
    
    // 显示前几个token作为示例
    console.log('\n前15个token示例:');
    tokens.slice(0, 15).forEach((token, i) => {
      console.log(`  ${i + 1}. '${token.character}' -> '${token.jyutping}' ${token.isPunctuation ? '(标点)' : ''}`);
    });
    
    // 显示标点符号token
    const punctuationTokens = tokens.filter(t => t.isPunctuation);
    console.log(`\n共找到 ${punctuationTokens.length} 个标点符号token`);
    if (punctuationTokens.length > 0) {
      console.log('标点符号示例:');
      punctuationTokens.slice(0, 5).forEach((token, i) => {
        console.log(`  ${i + 1}. '${token.character}'`);
      });
    }
    
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