const express = require('express')
const router = express.Router()
const { permission_getAll, permission_update } = require('../utils/db_curd')
// 获取所有权限
router.get('/permission/getAll', async (req, res) => {
    const permissions = await permission_getAll()
    res.json({
        code: 200,
        success: true,
        message: '获取所有权限成功',
        permissions: permissions
    })
})
// 修改权限名称，描述
router.post('/permission/update', async (req, res) => {
    const { permission_id, permission_name, permission_desc } = req.body
    const result = await permission_update(permission_id, permission_name, permission_desc)
    res.json({
        code: 200,
        success: true,
        message: '修改角色权限成功'
    })
})


module.exports = router