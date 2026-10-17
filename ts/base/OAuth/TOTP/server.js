import express from 'express'
import * as OTPAuth from 'otpauth'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

let userSecrets = new Map()
let testSectet = "US3WHSG7X5KAPV27VANWKQHF3SH3HULL"
app.get('/', (req, res) => {
    res.json({
        code: 200,
        message: 'TOTP服务运行'
    })
})

let issuer = 'JS creator ' // 后台挂钩


/**
 * @生成toptURL
 * 用于前端生成Qcode，
 * 生产环境接口 前端请求加上parma:userLabel等信息
 */
app.get('/totp', (req, res) => {
    let userLabel = '0110230306@csu.edu.cn' // 用户信息
    userSecrets.set(userLabel,)
    const totp = new OTPAuth.TOTP({
        issuer,
        label: userLabel,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: testSectet,
        // new OTPAuth.Secret({ size: 20 })
    });

    //userSecrets.set(userLabel, totp.secret.base32)

    res.json({
        code: 200,
        otpauthUrl: totp.toString()
    })

})


/**
 * @check
 * 1. 使用内存存储的user secret，所以每一次重启应用都会丢失Map，生产环境使用数据库存储
 * 2. 这里使用了固定secret用于测试
 */
app.post('/check', (req, res) => {

    const { userLabel, token } = req.body

    if (!userLabel || !token) {
        return res.json({
            code: 400,
            message: '缺少参数'
        })
    }

    // const secretBase32 = userSecrets.get(userLabel)

    // if (!secretBase32) {
    //     return res.json({
    //         code: 404,
    //         message: '用户未生成 TOTP'
    //     })
    // }
    const totp = new OTPAuth.TOTP({
        issuer: issuer,
        label: userLabel,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: testSectet,
        // OTPAuth.Secret.fromBase32(secretBase32)
    });

    console.log(totp.generate())
    //允许前后 1 个时间窗口
    const delta = totp.validate({ token, window: 1 })
    if (delta !== null) {
        res.json({
            code: 200,
            message: '校验成功',
            delta
        })
    } else {
        res.json({
            code: 401,
            message: '验证码错误'
        })
    }
})



app.listen(3000, () => console.log('TOTP服务运行中:3000'))