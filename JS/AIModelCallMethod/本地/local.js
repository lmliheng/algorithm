import { messageCreate, messageAdd } from '../deepseek/message_tools.js'

/**
 * @本地调用模型
 */


/**
 * 
 * @列出可用模型
 */
async function checkModel() {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        const data = await response.json();
        return data
    } catch (error) {
        console.error('获取模型列表失败:', error.message);
    }
}

/**
 * chat api 多轮对话
 * 
 */
async function callOllama(prompt) {
    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'qwen2.5-3b:q4_0',
            messages: prompt,
            stream: false,
        }),
    });

    const data = await response.json();
    return data.message.content;
}

/**
 * @generate API 单轮对话 我就没写了
 */



let list = await checkModel()
console.table(list.models.map((item) => item.model))
let messages = messageCreate('用二十个字说说react做了什么')
let res = await callOllama(messages)
console.log(res)