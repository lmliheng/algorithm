
export async function imageZ(prompt, size) {

    if (prompt === undefined) {
        return 'prompt不能为空'
    }

    let apikey = process.env.Z_API_KEY
    if (apikey === undefined) {
        return '缺少apikey'
    }

    let data = {
        model: "glm-image",
        prompt: prompt,
        size: size

    }
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/images/generations', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.Z_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    let res = await response.json()
    
    return res.data[0]

}

let res = await imageZ('绘制三角洲行动峰医被红狼用qcq171修脚的图片', '1280x1280')

console.log(res)