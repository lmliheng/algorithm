const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

// 单轮对话（CommonJS）
const hunyuan_openai_singlechat = async (prompt, model, api_key) => {
    // 构造 client
    const client = new OpenAI({
        apiKey: api_key,          // 混元 APIKey
        baseURL: "https://api.hunyuan.cloud.tencent.com/v1", // 混元 endpoint
    });
    // my_content是为了让模型输出规范的内容
    const my_content = `
   我给你发一段代码，如果不是代码，就直接返回'不是代码'，如果是代码，就返回一个json格式的回答。
   第一个字段是算法分析string 一个长字符串，
   第二个字段是复杂度分析是一个对象，包含时间复杂度和空间复杂度，
   例如：{"时间复杂度":"O(n^2)","空间复杂度":"O(n)}
   第四个字段是优化思路，是一个字符串，
   给我评分，第五个字段，数字1-5之间，越高越好。不要有其他内容，就输出json就行了
   第五个字段，算法标签，属于什么算法，重点是什么，比如{"标签":"["动态规划","递归","二叉树"]"}
   第六个字段，算法解决的问题，是一个字符串，比如{"问题":"求解最短路径"}
    `
    const completion = await client.chat.completions.create({
        model: model,
        messages: [
            {
                role: "user",
                content: my_content + prompt,
            },
        ],
        enable_enhancement: true, // 混元自定义参数
    });

    return completion.choices[0].message.content;
};

// ✅ CommonJS 导出方式
module.exports = {
    hunyuan_openai_singlechat,
};