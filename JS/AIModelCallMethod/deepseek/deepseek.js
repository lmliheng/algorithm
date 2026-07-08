
/**
 * @fetch基本案例 
 */
async function deepseek_response(message) {
    let data = {
        model: "deepseek-v4-pro",
        messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": message }
        ],
        thinking: { "type": "enabled" },
        reasoning_effort: "high",
        stream: false
    }
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk-9558a171e2d44765ae4795e4c8224fb3"
        },
        body: JSON.stringify(data),
    })
    // 为什么response 是一个promise而不是一个敲定的结果
    //  为什么要对response取json
    // fetch的原则是：“头到了就让你继续，体你自己决定什么时候读”
    let res = await response.json()
    console.log(res.choices[0].message.content)
}


deepseek_response('你好啊')


/**
 * @steam
 */