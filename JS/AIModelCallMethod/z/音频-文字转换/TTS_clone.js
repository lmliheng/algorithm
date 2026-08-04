/**
 * @语言克隆
 * 智谱的语音克隆不行 有bug
 */
export async function VoiceCloneZ(voice_name, text, input, file_id, request_id) {

    let apikey = process.env.Z_API_KEY
    if (apikey === undefined) {
        return '缺少apikey'
    }

    let data = {
        model: "glm-tts-clone",
        voice_name,
        text,
        input,
        file_id,
        request_id

    }
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/voice/clone', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.Z_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    let res = await response.json()

    return res.data

}

// let res = 
console.log(res)