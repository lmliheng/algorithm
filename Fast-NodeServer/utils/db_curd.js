const { pool } = require('./connect_db')
const { ComparePassword } = require('./crypto_password')
const { tokenValidator } = require('../utils/token_creator')
const { ToHash } = require('./crypto_password')

const token_getUserInfo = async (token) => {
    const decoded = await tokenValidator(token)
    const id = decoded.id
    try {
        const sql =
            `
        SELECT u.username, u.email, u.id, u.avatar, u.created_at, r.role_name, r.role_id, p.permission_name, p.permission_id
        FROM user u
        JOIN role r ON u.role_id = r.role_id
        JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
        JOIN permission p ON p.permission_id = rp.permission_id
        WHERE
        u.id = ${id};
        `
        const [rows] = await pool.query(sql)  // row 是一个对象数组，每个对象对应数据库中的的一条记录
        if (rows.length === 0) {
            return null
        }
        return rows
    } catch (error) {
        console.error('根据用户token查询用户信息错误:', error)
        throw error
    }
}

const user_update = async (id, username, email) => {
    try {
        const sql = 'UPDATE user SET username = ?, email = ? WHERE id = ?'
        await pool.query(sql, [username, email, id])
        return true
    } catch (error) {
        console.error('更新用户信息错误:', error)
        throw error
    }
}

// 查询所有用户信息
const user_getAll = async () => {
    try {
        const sql =
            `
        SELECT u.id, u.username, u.email, u.avatar, u.created_at, u.updated_at, r.role_id, r.role_name
        FROM user u JOIN role r ON u.role_id = r.role_id
        `
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询所有用户信息错误:', error)
        throw error
    }
}






const user_updatePassword = async (id, password) => {
    try {
        let hashedPassword = await ToHash(password)
        const sql = 'UPDATE user SET password = ? WHERE id = ?'
        await pool.query(sql, [hashedPassword, id])
        return true
    } catch (error) {
        console.error('更新用户密码错误:', error)
        throw error
    }
}

const login_loginByEmail = async (email, password) => {
    try {
        // 1. 先根据邮箱查询用户
        const sql = 'SELECT * FROM user WHERE email = ?'
        const [rows] = await pool.query(sql, [email])
        // 2. 如果用户不存在，返回 null
        if (rows.length === 0) {
            return null
        }
        const user = rows[0]
        // 3. 验证密码是否正确
        const isPasswordValid = await ComparePassword(password, user.password)
        if (!isPasswordValid) {
            return null
        }
        return user // 返回用户信息（包含密码）
    } catch (error) {
        console.error('登录查询错误:', error)
        throw error
    }
}

const login_loginByUsername = async (username, password) => {
    try {
        // 1. 先根据用户名查询用户
        const sql = 'SELECT * FROM user WHERE username = ?'
        const [rows] = await pool.query(sql, [username])
        // 2. 如果用户不存在，返回 null
        if (rows.length === 0) {
            return null
        }
        const user = rows[0]
        // 3. 验证密码是否正确
        const isPasswordValid = await ComparePassword(password, user.password)
        if (!isPasswordValid) {
            return null
        }
        return user // 返回用户信息（包含密码）
    } catch (error) {
        console.error('登录查询错误:', error)
        throw error
    }
}


const register_register = async (id, username, email, password) => {
    try {
        const sql = 'INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)'
        await pool.query(sql, [id, username, email, password])
        return true
    } catch (error) {
        console.error('注册用户错误:', error)
        throw error
    }
}


const register_checkExistByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM user WHERE email = ?'
        const [rows] = await pool.query(sql, [email])
        return rows.length > 0

    } catch (error) {
        console.error('检查用户是否存在错误:', error)
        throw error
    }
}

const register_checkExistByUsername = async (username) => {
    try {
        const sql = 'SELECT * FROM user WHERE username = ?'
        const [rows] = await pool.query(sql, [username])
        return rows.length > 0
    } catch (error) {
        console.error('检查用户是否存在错误:', error)
        throw error
    }
}

/**
 * 文章分类
 */

// 分页查询所有公开的文章


// 查询本用户下所有文章
const article_getAllByUserId = async (user_id) => {
    try {
        // 分页查询文章,分类怎么加进去
        const sql = `SELECT article_id, title,status,user, created_at, updated_at FROM article where user = ${user_id}`
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询本用户所有文章错误:', error)
        throw error
    }
}
// 页码分页查询本用户所有文章
const article_getAllByPage = async (user_id, page, page_size) => {
    try {
        const offset = (page - 1) * page_size
        const sql = `
        SELECT a.article_id, a.title, a.content, c.category_id, c.category_name, a.created_at, a.updated_at
        FROM
        article a
        JOIN articleandcategory_middle ac ON a.article_id = ac.article_id
        JOIN article_category c ON c.category_id = ac.category_id
        WHERE
        a.user = ${user_id}
        ORDER BY a.created_at DESC
        LIMIT ${page_size}
        OFFSET ${offset}
        `
        // 2. 查询总数
        const countSql = `
        SELECT COUNT(*) as total
        FROM article a
        WHERE a.user = ${user_id}
        `
        const [rows] = await pool.query(sql)
        // console.log('rows:', rows)
        const [countRows] = await pool.query(countSql)
        // console.log('countRows:', countRows)
        return {
            total: countRows[0].total,
            articleList: rows
        }
    } catch (error) {
        console.error('页码分页查询所有文章错误:', error)
        throw error
    }
}
// 查询文章详情
const article_getDetail = async (article_id) => {
    try {
        const sql = `SELECT * FROM article WHERE article_id = ${article_id}`
        const [rows] = await pool.query(sql)
        return rows[0]
    } catch (error) {
        console.error('查询文章详情错误:', error)
        throw error
    }
}


// 删除本用户的文章
const article_deleteById = async (article_id, user_id) => {
    try {
        const sql = `DELETE FROM article WHERE article_id = ${article_id} and user = ${user_id}`
        await pool.query(sql)
        return true
    } catch (error) {
        console.error('删除文章错误:', error)
        throw error
    }
}

// 更新文章
const article_postEdit = async (id, title, content, cart_id, cart_name, user_id) => {
    try {
        const sql = 'UPDATE article SET title = ?, content = ?, cart_id = ?, cart_name = ? WHERE id = ? and user_id = ?'
        await pool.query(sql, [title, content, cart_id, cart_name, id, user_id])
        return true
    } catch (error) {
        console.error('更新文章错误:', error)
        throw error
    }
}
// 添加文章
const article_add = async (id, title, content, cart_id, cart_name, user_id) => {
    try {
        const sql = 'INSERT INTO article (id, title, content, cart_id, cart_name, user_id) VALUES (?, ?, ?, ?, ?, ?)'
        await pool.query(sql, [id, title, content, cart_id, cart_name, user_id])
        return true
    } catch (error) {
        console.error('添加文章错误:', error)
        throw error
    }
}

// 查询文章分类
const article_category_getAllByArticleId = async (article_id) => {
    try {
        const sql = `
        SELECT * FROM article_category ac
        JOIN articleandcategory_middle acm ON ac.category_id = acm.category_id
        WHERE acm.article_id = ${article_id}`
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询文章分类错误:', error)
        throw error
    }
}


// 查询所有用户分类(admin)
const article_category_getAll = async () => {
    try {
        const sql = 'SELECT * FROM article_category'
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询所有文章分类错误:', error)
        throw error
    }
}


// 查询本用户分类
const article_category_getAllByUserId = async (user_id) => {
    try {
        const sql = `SELECT * FROM article_category WHERE user = ${user_id}`
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询本用户分类错误:', error)
        throw error
    }
}
// 删除某分类
const article_category_delete = async (category_id, user_id) => {
    try {
        const sql = 'DELETE FROM article_category WHERE category_id = ? and user = ?'
        await pool.query(sql, [category_id, user_id])
        return true
    } catch (error) {
        console.error('删除某分类错误:', error)
        throw error
    }
}
// 添加某分类
const article_category_add = async (category_name, user_id) => {
    try {
        const sql = 'INSERT INTO article_category (category_name, user) VALUES (?, ?)'
        await pool.query(sql, [category_name, user_id])
        return true
    } catch (error) {
        console.error('添加文章分类错误:', error)
        throw error
    }
}
// 页码分页查询本用户下某分类下的文章
const article_getByCategoryIdByPage = async (user_id, category_id, page, page_size) => {
    try {
        const offset = (page - 1) * page_size
        const sql = `
        SELECT a.id, a.title, a.content, a.category_id, a.category_name, a.created_at, a.updated_at
        FROM article a
        LEFT JOIN article_category c ON a.category_id = c.category_id
        WHERE
        c.category_id = ${category_id}
    AND a.user_id = ${user_id}
ORDER BY a.created_at DESC
LIMIT ${page_size}
OFFSET ${offset} `
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('页码分页查询本用户下某分类下的文章错误:', error)
        throw error
    }
}
// 查询某分类下的文章列表
const article_category_getArticleListByUserId = async (category_id, user_id) => {
    try {
        const sql = `
        SELECT * FROM article a
        LEFT JOIN articleandcategory c ON a.category_id = c.category_id
        WHERE c.category_id = ${category_id} and a.user_id = ${user_id}`
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('article_category_getArticleListByUserId:查询文章分类下的文章列表错误:', error)
        throw error
    }
}
// 更新文章分类
const article_category_update = async (category_id, category_name, user_id) => {
    try {
        const sql = 'UPDATE article_category SET category_name = ? WHERE category_id = ? and user = ?'
        await pool.query(sql, [category_name, category_id, user_id])
        return true
    } catch (error) {
        console.error('更新文章分类错误:', error)
        throw error
    }
}
// 给文章设置分类
const article_category_set = async (article_id, category_id) => {
    try {
        const sql = 'INSERT INTO articleandcategory_middle (article_id, category_id) VALUES (?, ?)'
        await pool.query(sql, [article_id, category_id])
        return true
    } catch (error) {
        console.error('设置文章分类错误:', error)
        throw error
    }
}


const article_getByUserId = async (article_id, user_id) => {
    try {
        const sql = `SELECT * FROM article WHERE article_id = ${article_id} and user = ${user_id}`
        const [rows] = await pool.query(sql)
        return rows[0]
    } catch (error) {
        console.error('查询本用户的某文章错误:', error)
        throw error
    }
}
const category_getByUserId = async (category_id, user_id) => {
    try {
        const sql = `SELECT * FROM article_category WHERE category_id = ${category_id} and user = ${user_id}`
        const [rows] = await pool.query(sql)
        return rows[0]
    } catch (error) {
        console.error('查询本用户的某分类错误:', error)
        throw error
    }
}


const role_getAll = async () => {
    try {
        const sql = 'SELECT * FROM role'
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询所有角色错误:', error)
        throw error
    }
}
const role_getById = async (user_id) => {
    try {
        const sql =
            `
        SELECT role_id FROM user
        WHERE id = ${user_id}
        `
        const [rows] = await pool.query(sql)
        return rows[0]
    } catch (error) {
        console.error('查询角色详情错误:', error)
        throw error
    }
}

// 增加角色权限
const role_addPermission = async (role_id, permission_id_list) => {
    try {
        for (let i = 0; i < permission_id_list.length; i++) {
            // 有问题
            let permission_id = permission_id_list[i]
            let sql = `INSERT INTO roleandpermission_middle (role_id, permission_id) VALUES (${role_id}, ${permission_id})`
            await pool.query(sql)
        }
        return true

    } catch (error) {
        console.error('增加角色权限错误:', error)
        throw error
    }
}
// 更新角色名称
const role_updateName = async (role_id, role_name) => {
    try {
        const sql = 'UPDATE role SET role_name = ? WHERE role_id = ?'
        await pool.query(sql, [role_name, role_id])
        return true
    } catch (error) {
        console.error('更新角色名称错误:', error)
        throw error
    }
}
// 添加角色
const role_add = async (role_name) => {
    try {
        const sql = 'INSERT INTO role (role_name) VALUES (?)'
        await pool.query(sql, [role_name])
        return true
    } catch (error) {
        console.error('添加角色错误:', error)
        throw error
    }
}
// 删除角色
const role_delete = async (role_id) => {
    try {
        const sql = 'DELETE FROM role WHERE role_id = ?'
        await pool.query(sql, [role_id])
        return true
    } catch (error) {
        console.error('删除角色错误:', error)
        throw error
    }
}


// 用户角色和权限的查询在token_getUserInfo中实现了

const permission_getAll = async () => {
    try {
        const sql = 'SELECT * FROM permission'
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error('查询所有权限错误:', error)
        throw error
    }
}


module.exports = {

    register_checkExistByEmail, // 检查邮箱是否存在
    register_checkExistByUsername, // 检查用户名是否存在
    register_register, // 注册用户
    user_updatePassword, // 更新用户密码
    login_loginByEmail, // 邮箱登录
    login_loginByUsername, // 用户名登录
    // 文章相关
    article_getAllByUserId, // 查询本用户下所有文章
    article_postEdit, // 更新文章
    article_add, // 添加文章
    article_getDetail, // 查询文章详情
    article_deleteById, // 删除本用户的文章
    article_getAllByPage, // 查询所有文章分页
    article_getByCategoryIdByPage, // 查询某分类下的文章分页
    article_category_getAllByArticleId, // 查询文章分类

    // 分类相关
    article_category_getAll, // 查询所有分类
    article_category_getArticleListByUserId, // 查询某分类下的文章列表
    article_category_delete, // 删除某分类
    article_category_add, // 添加某分类
    article_category_update, // 更新文章分类
    article_category_getAllByUserId, // 查询本用户分类
    article_category_set, // 给文章设置分类

    // 用户相关
    token_getUserInfo, // 获取用户信息
    user_update, // 更新用户信息
    role_getAll, // 查询所有角色
    user_getAll, // 查询所有用户信息
    permission_getAll, // 查询所有权限


    // 角色相关
    role_addPermission, // 增加角色权限
    role_updateName, // 更新角色名称
    role_add, // 添加角色
    role_delete, // 删除角色

    // 起检查作用的查询
    article_getByUserId, // 查询本用户的某文章
    category_getByUserId, // 查询本用户的某分类
    role_getById, // 查询角色详情

}
