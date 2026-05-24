const express = require('express')
const router = express.Router()
const { article_category_getAll,
        article_category_delete,
        article_category_add,
        article_category_update,
        article_category_getAllByUserId

} = require('../utils/db_curd')
const { tokenValidator } = require('../utils/token_creator')

//========================================
//table: article_cart 
//cart_id: 文章分类id
//cart_name: 文章分类名称
//user_id: 创建 用户id
//created_at: 创建时间
//updated_at: 更新时间
//========================================
// 查询所有分类列表（管理员 后台使用）
router.get('/article_category/getAll', async (req, res) => {
    const token = req.headers.authorization
    const decoded = tokenValidator(token)
    if (!decoded || decoded.id !== 1) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '权限不足'
        })
    }
    const user_id = decoded.id
    try {
        const articleCartList = await article_category_getAll(user_id)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            articleCartList: articleCartList
        })
    } catch (error) {
        console.error('获取文章分类列表错误:', error)
        return res.status(500).send('获取文章分类列表失败', error.message)
    }
})
// 查询本用户下所有分类列表
router.get('/article_category/getAllByUserId', async (req, res) => {
    const token = req.headers.authorization
    const decoded = tokenValidator(token)
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        })
    }
    const user_id = decoded.id
    // 为什么块级作用域下的user_id在其他router下面有值
    try {
        const articleCartList = await article_category_getAllByUserId(user_id)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            articleCartList: articleCartList
        })
    } catch (error) {
        console.error('获取文章分类列表错误:', error)
        return res.status(500).send('获取文章分类列表失败', error.message)
    }
})

// 添加分类
router.post('/article_category/add', async (req, res) => {
    const token = req.headers.authorization
    const { category_name } = req.body
    console.log(category_name)
    if (!category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章分类名称不能为空'
        })
    }

    // 获取用户id
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
        const articleCart = await article_category_add(category_name, user_id)
        res.json({
            code: 200,
            success: true,
            message: '添加成功',
            articleCart: articleCart
        })
    } catch (error) {
        console.error('添加文章分类错误:', error)
        return res.status(500).send('添加文章分类失败', error.message)
    }
})
// 更新分类
router.put('/article_category/update', async (req, res) => {
    const token = req.headers.authorization
    const { category_id, category_name } = req.body
    if (!category_id || !category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章分类id、分类名称不能为空'
        })
    }
    // 获取用户id
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
        const articleCart = await article_category_update(category_id, category_name, user_id)
        res.json({
            code: 200,
            success: true,
            message: '更新成功',
            articleCart: articleCart
        })
    } catch (error) {
        console.error('更新文章分类错误:', error)
        return res.status(500).send('更新文章分类失败', error.message)
    }
})
// 删除分类 -private / admin 要保证分类属于用户自己
router.delete('/article_category/delete', async (req, res) => {
    const token = req.headers.authorization
    const { category_id } = req.body
    if (!category_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章分类id不能为空'
        })
    }
    // 获取用户id
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

        const checkCategory = await article_category_getByUserId(category_id, user_id)
        if (!checkCategory) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: '本用户的某文章分类不存在或者不属于用户自己'
            })
        }
        
        const articleCart = await article_category_delete(category_id, user_id)
        res.json({
            code: 200,
            success: true,
            message: '删除成功',
            articleCart: articleCart
        })
    } catch (error) {
        console.error('删除文章分类错误:', error)
        return res.status(500).send('删除文章分类失败', error.message)
    }
})


module.exports = router