
/**
 * 
 * @向量模型
 */
export async function embeddingZ(str, demensions) {

    let apikey = process.env.Z_API_KEY
    if (apikey === undefined) {
        return '缺少apikey'
    }

    let data = {
        model: "embedding-3",
        input: str,
        demensions: demensions,
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/embeddings', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.Z_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    let res = await response.json()
    return res.data[0].embedding
}


let res = await embeddingZ('我是liheng', 512)
console.log(res.length)
