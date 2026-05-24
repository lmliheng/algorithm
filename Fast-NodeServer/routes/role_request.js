const express = require('express')
const router = express.Router()
const { role_getAll, role_addPermission, role_updateName, role_add, role_getById, role_delete } = require('../utils/db_curd')
const { tokenValidator } = require('../utils/token_creator')
// 获取所有角色信息
router.get('/role/getAll', async (req, res) => {
    const roles = await role_getAll()
    res.json({
        code: 200,
        success: true,
        message: '获取所有角色成功',
        roles: roles
    })
})
// 根据id获取角色信息
router.get('/role/getById', async (req, res) => {
    const { role_id } = req.body
    const role = await role_getById(role_id)
    res.json({
        code: 200,
        success: true,
        message: '获取角色成功',
        role: role
    })
})
// 增加角色权限
router.post('/role/addPermission', async (req, res) => {
    const { role_id, permission_id_list } = req.body // permission_id_list 是一个数组，包含角色的权限id列表
    const permission_id_list_array = permission_id_list.split(',')

    const token = req.headers.authorization
    const decoded = await tokenValidator(token)
    if (decoded === null) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未登录或登录过期'
        })

    }
    let user_id = decoded.id
    const check_role = await role_getById(user_id)
    if (check_role === null) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '角色不存在'
        })
    }

    if (check_role.role_id !== 1) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '权限不足'
        })
    }

    try {
        // 首先得有增加角色权限的权限，这里简化为管理员权限，以后再写权限检查
        const result = await role_addPermission(role_id, permission_id_list_array)
        if (result === null) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: '增加角色权限失败'
            })
        } else {
            console.log("result:", result)
            res.json({
                code: 200,
                success: true,
                message: '修改角色权限成功'
            })
        }
    } catch (error) {
        console.error('修改角色权限错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }

})
// 更新角色名
router.put('/role/updateName', async (req, res) => {
    const { role_id, role_name } = req.body
    const result = await role_updateName(role_id, role_name)
    res.json({
        code: 200,
        success: true,
        message: '修改角色名成功'
    })
})
//增加角色
router.post('/role/add', async (req, res) => {
    const { role_name } = req.body
    const token = req.headers.authorization
    const decoded = await tokenValidator(token)
    if (decoded === null) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未登录或登录过期'
        })

    }
    let user_id = decoded.id
    const check_role = await role_getById(user_id)
    if (check_role === null) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '角色不存在'
        })
    }

    if (check_role.role_id !== 1) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '权限不足'
        })
    }


    try {
        const result = await role_add(role_name)
        res.json({
            code: 200,
            success: true,
            message: '增加角色成功'
        })
    } catch (error) {
        console.error('增加角色错误:', error)
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        })
    }
})
// 删除角色
router.delete('/role/delete', async (req, res) => {
    const { role_id } = req.body

    const token = req.headers.authorization
    const decoded = await tokenValidator(token)
    if (decoded === null) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未登录或登录过期'
        })

    }
    let user_id = decoded.id
    const check_role = await role_getById(user_id)
    if (check_role === null) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '角色不存在'
        })
    }

    if (check_role.role_id !== 1) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '权限不足'
        })
    }

    const result = await role_delete(role_id)
    res.json({
        code: 200,
        success: true,
        message: '删除角色成功'
    })
})


module.exports = router