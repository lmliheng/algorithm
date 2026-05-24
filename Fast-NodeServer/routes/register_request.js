const express = require('express')
const router = express.Router()
const { register_checkExistByEmail, register_checkExistByUsername, register_register } = require('../utils/db_curd')
const { ToHash } = require('../utils/crypto_password')
const { generateId } = require('../utils/id_creator')
const { tokenCreator } = require('../utils/token_creator')

//========================================
// 26-5-8 
//table: user
//id: 用户id
//username: 用户名
//email: 邮箱
//password: 密码
//created_at: 创建时间
//updated_at: 更新时间
//========================================

// 从前端data中拿注册配置register_mode:email或phone或者wechat或者GitHub，
// 不加默认没有注册邮箱和手机短信注册模式

router.post('/register', async (req, res) => {

    let register_mode = req.body.register_mode ? req.body.register_mode : ''
    // 简单注册模式
    if (register_mode === '') {
        const { username, email, password } = req.body
        // 判断用户名和邮箱是否为空
        if (!username || !email || !password) {
            return res.json({
                code: 400,
                success: false,
                message: '用户名、邮箱或密码不能为空'
            })
        }
        // 判断邮箱是否已存在
        const existingUser = await register_checkExistByEmail(email)  //boolean类型
        if (existingUser) {
            return res.json({
                code: 400,
                success: false,
                message: '邮箱已存在'
            })
        }
        const existingUsername = await register_checkExistByUsername(username)  //boolean类型
        if (existingUsername) {
            return res.json({
                code: 400,
                success: false,
                message: '用户名已存在'
            })
        }
        try {
            const hashedPassword = await ToHash(password)
            // 生成id
            const id = await generateId()
            // 注册用户
            await register_register(id, username, email, hashedPassword)
            // 生成token
            const token = await tokenCreator({ id, username, email })
            // 响应
            res.json({
                code: 200,
                success: true,
                message: '注册成功',
                token,
                user_info: {
                    id: id,
                    username: username,
                    email: email
                }
            })
        } catch (error) {
            console.error('注册用户错误:', error)
            return res.status(500).send('注册用户失败', error.message)
        }
    }

    // 邮箱注册模式
    if (register_mode === 'email') {

        res.json({
            code: 200,
            success: true,
            message: '邮箱注册模式，未开发'
        })

    }




})

module.exports = router
