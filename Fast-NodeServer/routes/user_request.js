const express = require('express')
const router = express.Router()
const { token_getUserInfo, user_updatePassword, user_getAll } = require('../utils/db_curd')
const { tokenCreator, tokenValidator } = require('../utils/token_creator')
const { user_update } = require('../utils/db_curd')
const { ToHash } = require('../utils/crypto_password')

//========================================
//table: user
//id: 用户id
//username: 用户名
//email: 邮箱
//password: 密码
//avatar: 头像
//created_at: 创建时间
//updated_at: 更新时间
//========================================

// 获取用户信息
router.get('/userInfo', async (req, res) => {
    try {
        const token = req.headers.authorization
        const user_info = await token_getUserInfo(token)
        if (user_info === null) {
            return res.status(401).json({
                code: 401,
                success: false,
                message: '找不到用户信息，是否未登录或登录过期'
            })
        }
        const user_permission = user_info.map(
            item => {
                return { permission_name: item.permission_name, permission_id: item.permission_id }
            })

        const user_detail = user_info[0]
        delete user_detail.permission_name
        delete user_detail.permission_id

        res.json({
            code: 200,
            success: true,
            message: '获取用户信息成功',
            user_info: {
                user_detail,
                user_permission,
                login_time: new Date().toLocaleString()
            }
        })
    } catch (error) {
        console.error('获取用户信息错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }
})

// 更新用户基本信息
router.put('/userInfo', async (req, res) => {
    const { id, username, email } = req.body
    // 参数校验
    if (!id || !username || !email) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '用户id、用户名、邮箱不能为空'
        })
    }
    try {
        // 密码加密
        await user_update(id, username, email)
        res.json({
            code: 200,
            success: true,
            message: '更新用户信息成功'
        })
    } catch (error) {
        console.error('更新用户信息错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }
}
)

// 重置用户密码 
router.post('/resetPassword', async (req, res) => {
    const token = req.headers.authorization
    const { password } = req.body
    const decoded = tokenValidator(token)
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        })
    }
    const user_id = decoded.id

    // 参数校验
    if (!password) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '密码不能为空'
        })
    }
    try {
        await user_updatePassword(user_id, password)// 方法里会加密
        res.json({
            code: 200,
            success: true,
            message: '重置用户密码成功'
        })
    } catch (error) {
        console.error('重置用户密码错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }
}
)

// 更新用户权限
// router.put('/updatePermission', async (req, res) => {
//     const { id, permission_ids } = req.body
//     // 参数校验
//     if (!id || !permission_ids) {
//         return res.status(400).json({
//             code: 400,
//             success: false,
//             message: '用户id、权限id不能为空'
//         })
//     }
//     try {
//         await user_updatePermission(id, permission_ids)
//         res.json({
//             code: 200,
//             success: true,
//             message: '更新用户权限成功'
//         })
//     } catch (error) {
//         console.error('更新用户权限错误:', error)
//         res.status(500).json({
//             success: false,
//             message: '服务器内部错误'
//         })
//     }
// }
// )

// 获取所有用户信息
router.get('/getAllUserInfo', async (req, res) => {
    const  token  = req.headers.authorization
    const decoded = tokenValidator(token)
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        })
    }
    const user_id = decoded.id

    try {
        if (user_id !== 1) {
            return res.status(403).json({
                code: 403,
                success: false,
                message: '权限不足'
            })
        } else {
            const users = await user_getAll()
            res.json({
                code: 200,
                success: true,
                message: '获取所有用户信息成功',
                users: users
            })
        }
    } catch (error) {
        console.error('获取所有用户信息错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }

})





module.exports = router
