/**
 * @SSE协议的多轮对话测试
 * 需要把模型配置里stream设置为true
 */

// import { deepseek_response } from './deepseek.js'
import { messageAdd, messageCreate } from './message_tools.js'
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


let message
function ask() {
    rl.question('user: ', async (answer) => {
        if (answer.toLowerCase() === 'exit') {
            rl.close()
            return
        }
        if (message === undefined) {
            message = messageCreate(answer)
        } else {
            message = messageAdd(message, answer, 'user')
        }


        let res = await fetch('https://api.deepseek.com/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.DEEP_SEEK_API}`
            },
            body: JSON.stringify({
                model: "deepseek-v4-pro",
                messages: message,
                thinking: { "type": "disabled" },
                reasoning_effort: "high",
                stream: true
            }),
        })

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        let result = ''
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
           // console.log('收到数据块:', chunk);  // 这里就能看到逐步输出的内容了
            // 解析 SSE 格式的数据（通常是 "data: {...}\n\n"） 手动解析
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                    const jsonStr = line.slice(6);
                    try {
                        const data = JSON.parse(jsonStr);
                        const content = data.choices?.[0]?.delta?.content || '';
                        result += content;
                        process.stdout.write(content);  // 实时输出到控制台
                    } catch (e) {
                        // 忽略解析错误
                    }
                }
            }
        }


        message = messageAdd(message, result, 'assistant')
        ask() // 递归继续对话
    })
}

ask()