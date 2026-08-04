
export async function chatZ(message) {

    if(message===undefined){
        return 'message不能为空'
    }

    let apikey = process.env.Z_API_KEY
    if (apikey === undefined) {
        return '缺少apikey'
    }

    let data = {
        model: "glm-5.2",
        messages: message,// 格式我自己书写
        thinking: { "type": "enabled" },
        reasoning_effort: "high",
        stream: false
    }
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.Z_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    let res = await response.json()
    return res.choices[0].message.content
}


