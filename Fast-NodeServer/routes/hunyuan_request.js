const { hunyuan_openai_singlechat } = require("../utils/hunyuan");
const express = require('express')
const router = express.Router()
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

router.get('/singlechat', async (req, res) => {
    const { prompt } = req.query;
    const api_key = process.env['HUNYUAN_API_KEY'];
    const model = "hunyuan-turbos-latest";
    const response = await hunyuan_openai_singlechat(prompt, model, api_key)
    res.json({
        code: 200,
        success: true,
        message: '获取成功',
        response: response
    })
})

module.exports = router;