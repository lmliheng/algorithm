const express = require('express')
const router = express.Router()
const { article_getDetail, article_getByUserId, category_getByUserId, article_category_set, article_category_getAllByArticleId, article_getByCategoryIdByPage, article_getAllByUserId, article_getAllByPage, article_add, article_deleteById, article_postEdit } = require('../utils/db_curd')
const { tokenValidator } = require('../utils/token_creator')
//========================================

//table: article
//id: 文章id
//title: 文章标题
//content: 文章内容
//status: 状态：0-草稿，1-已发布，2-仅自己可见
//user_id: 创建用户id
//category_id: 文章分类id 
//category_name: 文章分类名称
//created_at: 创建时间
//updated_at: 更新时间

//========================================
// id是文章id，不是分类id，不是用户id，是文章的唯一标识，不自增，前端使用时间戳生成

// 查询

// 查询本用户文章列表 慎用
router.get('/article/getAll', async (req, res) => {
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

    try {
        const articleList = await article_getAllByUserId(user_id)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            articleList: articleList
        })
    } catch (error) {
        console.error('获取文章列表错误:', error)
        return res.status(500).send('获取文章列表失败', error.message)
    }
})
// 页码分页查询所有文章 没有传入排序字段，直接写在sql中按创建时间降序排序
router.get('/article/getAllByPage', async (req, res) => {
    const { page, page_size } = req.query
    if (!page || !page_size) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '页码和每页数量不能为空'
        })
    }
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
    try {
        const { total, articleList } = await article_getAllByPage(user_id, page, page_size)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                total: total,
                articleList: articleList
            },
        })
    } catch (error) {
        console.error('获取文章列表错误:', error)
        return res.status(500).send('获取文章列表失败', error.message)
    }

}
)

// 页码分页查询本用户下某分类下的文章
router.get('/article/getSomeByPageAndCategory', async (req, res) => {
    const { page, page_size, category_id } = req.query
    if (!page || !page_size || !category_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '页码、每页数量、分类id不能为空'
        })
    }
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
    try {
        const { total, articleList } = await article_getByCategoryIdByPage(user_id, category_id, page, page_size)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                total: total,
                articleList: articleList
            },

        })
    } catch (error) {
        console.error('获取文章列表错误:', error)
        return res.status(500).send('获取文章列表失败', error.message)
    }
}
)

// 查询公开文章详情 -public 
router.get('/article/detail', async (req, res) => {
    const { article_id } = req.query
    if (!article_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id不能为空'
        })
    }
    try {

        const searchResult = await article_getDetail(article_id)
        if (searchResult === null) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: '文章不存在'
            })
        } else if (searchResult.status !== 1) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: '文章不是公开的'
            })
        } else {
            res.json({
                code: 200,
                success: true,
                message: '获取成功',
                article: searchResult
            })
        }
    } catch (error) {
        console.error('查询文章详情错误:', error)
        return res.status(500).send('查询文章详情失败', error.message)
    }
})
// 查询公开文章分类 -public
router.get('/article_category/getAll', async (req, res) => {
    const { article_id } = req.body
    try {
        const categoryList = await article_category_getAllByArticleId(article_id)
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            categoryList: categoryList
        })
    } catch (error) {
        console.error('查询文章分类错误:', error)
        return res.status(500).send('查询文章分类失败', error.message)
    }
})


// 添加文章 -private
router.post('/article/add', async (req, res) => {
    const { id, title, content, category_id, category_name } = req.body
    if (!id || !title || !content || !category_id || !category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id、标题、内容、分类id、分类名称不能为空'
        })
    }
    // token拿取user_id
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

    try {
        const checkCategory = await article_category_getByUserId(category_id, user_id)
        if (!checkCategory) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: '本用户的某文章分类不存在或者不属于用户自己'
            })
        }

        const article = await article_add(id, title, content, category_id, category_name, user_id)
        res.json({
            code: 200,
            success: true,
            message: '添加成功',
            article: article
        })
    } catch (error) {
        console.error('添加文章错误:', error)
        return res.status(500).send('添加文章失败', error.message)
    }
})
// 更新文章 -private
router.put('/article/update', async (req, res) => {
    const { id, title, content, cart_id, cart_name } = req.body
    if (!id || !title || !content || !cart_id || !cart_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id、标题、内容、分类id、分类名称不能为空'
        })
    }
    // token拿取user_id
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
    // 更新请求
    try {
        const checkArticle = await article_getByUserId(id, user_id)
        if (!checkArticle) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: '本用户的某文章不存在或者不属于用户自己'
            })
        }
        const article = await article_postEdit(id, title, content, cart_id, cart_name, user_id)
        res.json({
            code: 200,
            success: true,
            message: '更新成功',
            article: article
        })
    } catch (error) {
        console.error('更新文章错误:', error)
        return res.status(500).send('更新文章失败', error.message)
    }
})
// 删除文章 -private / admin 要保证文章属于用户自己
router.delete('/article/delete', async (req, res) => {
    const token = req.headers.authorization
    const { article_id } = req.body
    if (!article_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id不能为空'
        })
    }
    // token拿取user_id
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

        const checkArticle = await article_getByUserId(article_id, user_id)
        if (!checkArticle) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: '本用户的某文章不存在或者不属于用户自己'
            })
        }

        const article = await article_deleteById(article_id, user_id)
        res.json({
            code: 200,
            success: true,
            message: '删除成功',
            article: article
        })
    } catch (error) {
        console.error('删除文章错误:', error)
        return res.status(500).send('删除文章失败', error.message)
    }
})
// 给文章设置分类，要保证文章和分类都属于用户自己
router.post('/article_category/set', async (req, res) => {
    const { article_id, category_id } = req.body
    if (!article_id || !category_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id、分类id不能为空'
        })
    }
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

    // 检查文章是否属于用户，分类是否属于用户
    const checkArticle = await article_getByUserId(article_id, user_id)
    if (!checkArticle) {
        return res.status(404).json({
            code: 404,
            success: false,
            message: '本用户的某文章不存在或者不属于用户自己'
        })
    }
    const checkCategory = await article_category_getByUserId(category_id, user_id)
    if (!checkCategory) {
        return res.status(404).json({
            code: 404,
            success: false,
            message: '分类不存在'
        })
    }

    try {
        const article_category = await article_category_set(article_id, category_id, user_id)
        res.json({
            code: 200,
            success: true,
            message: '设置成功',
            article_category: article_category
        })
    } catch (error) {
        console.error('设置文章分类错误:', error)
        return res.status(500).send('设置文章分类失败', error.message)
    }
})



module.exports = router
