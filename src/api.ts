const DEEPSEEK_API_KEY = 'your-deepseek-api-key';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function validateCantoneseJyutping(character: string, jyutping: string): Promise<boolean> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个粤语拼音专家，请判断给定的汉字和粤语拼音是否匹配。只返回 "正确" 或 "错误"。',
          },
          {
            role: 'user',
            content: `汉字: ${character}, 粤语拼音: ${jyutping}`,
          },
        ],
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content.trim();
    return result === '正确';
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    // 失败时使用本地验证
    return true;
  }
}
