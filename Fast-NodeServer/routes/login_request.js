const express = require('express')
const router = express.Router()
const { login_loginByEmail, login_loginByUsername } = require('../utils/db_curd')
const { tokenCreator } = require('../utils/token_creator')

//========================================
// 26-5-8
//table: user
//id: 用户id
//avatar: 头像
//role_id: 角色id
//username: 用户名
//email: 邮箱
//password: 密码
//created_at: 创建时间
//updated_at: 更新时间
//========================================

// 邮箱或用户名 + 密码登录
router.post('/login', async (req, res) => {
    let login_mode = req.body.email ? 'email' : 'username'
    if (login_mode === 'email') {
        try {
            const { email, password } = req.body
            const user = await login_loginByEmail(email, password)
            if (user == null) {
                console.log('login.js 用户不存在或密码错误');
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: '邮箱或密码错误'
                })
            }
            const token = tokenCreator(user)
            console.log('login.js 用户登录成功', user.id, user.username, user.email);
            res.json({
                code: 200,
                success: true,
                message: '登录成功',
                token,
                user_info: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role_id: user.role_id,
                    avatar: user.avatar,
                    login_time: new Date().toLocaleString()
                }
            })
        } catch (error) {
            console.error('登录错误:', error)
            res.status(500).json({
                success: false,
                message: '服务器内部错误'
            })
        }
    }
    else {
        try {
            const { username, password } = req.body
            const user = await login_loginByUsername(username, password)
            if (user == null) {
                console.log('login.js 用户不存在或密码错误');
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: '用户名或密码错误'
                })
            }
            const token = tokenCreator(user)
            console.log('login.js 用户登录成功', user.id, user.username, user.email);
            res.json({
                code: 200,
                success: true,
                message: '登录成功',
                token,
                user_info: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    login_time: new Date().toLocaleString()
                }
            })
        } catch (error) {
            console.error('登录错误:', error)
            res.status(500).json({
                success: false,
                message: '服务器内部错误'
            })
        }
    }
})

module.exports = router
