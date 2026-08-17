
/**
 * @
 * fetch(url,配置对象option)
 */
export async function deepseek_response(message) {
    let data = {
        model: "deepseek-v4-pro",
        messages: message,// 格式我自己书写
        thinking: { "type": "enabled" },
        reasoning_effort: "high",
        stream: false 
    }
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    // 为什么response 是一个promise而不是一个敲定的结果
    //  为什么要对response取json
    // fetch的原则是：“头到了就让你继续，体你自己决定什么时候读”
    let res = await response.json()
    return res.choices[0].message.content
}


