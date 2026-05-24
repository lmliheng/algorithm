# Fast-NodeServer 脱坑指南

> 本文档记录项目中发现的所有问题及其正确的实现方式，帮助你快速避坑。

---

## 一、安全问题（必须修复）

### 1. SQL 注入漏洞 🚨

#### 问题代码

**文件**: [utils/db_curd.js](file:///c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer\utils\db_curd.js)

以下是所有存在 SQL 注入风险的位置：

```javascript
// ❌ 危险位置 1: token_getUserInfo
const sql = `
    SELECT u.username, u.email, u.id, u.avatar, u.created_at, r.role_name, r.role_id, p.permission_name, p.permission_id
    FROM user u
    JOIN role r ON u.role_id = r.role_id
    JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
    JOIN permission p ON p.permission_id = rp.permission_id
    WHERE u.id = ${id};  // 🚨 直接拼接
`

// ❌ 危险位置 2: article_getAllByUserId
const sql = `SELECT article_id, title, status, user, created_at, updated_at FROM article where user = ${user_id}`

// ❌ 危险位置 3: article_getDetail
const sql = `SELECT * FROM article WHERE article_id = ${article_id}`

// ❌ 危险位置 4: article_deleteById
const sql = `DELETE FROM article WHERE article_id = ${article_id} and user = ${user_id}`

// ❌ 危险位置 5: article_isPublic
const sql = `SELECT status FROM article WHERE article_id = ${article_id}`
```

#### 正确实现

```javascript
// ✅ 正确写法：使用参数化查询

// token_getUserInfo - 修复后
const token_getUserInfo = async (token) => {
    const decoded = await tokenValidator(token);
    if (!decoded || !decoded.id) {
        throw new Error('无效的 Token');
    }
    const id = decoded.id;
    try {
        const sql = `
            SELECT u.username, u.email, u.id, u.avatar, u.created_at, r.role_name, r.role_id, p.permission_name, p.permission_id
            FROM user u
            JOIN role r ON u.role_id = r.role_id
            JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
            JOIN permission p ON p.permission_id = rp.permission_id
            WHERE u.id = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows;
    } catch (error) {
        console.error('根据用户token查询用户信息错误:', error);
        throw error;
    }
};

// article_getAllByUserId - 修复后
const article_getAllByUserId = async (user_id) => {
    try {
        const sql = `SELECT article_id, title, status, user, created_at, updated_at FROM article WHERE user = ?`;
        const [rows] = await pool.query(sql, [user_id]);
        return rows;
    } catch (error) {
        console.error('查询本用户所有文章错误:', error);
        throw error;
    }
};

// article_getDetail - 修复后
const article_getDetail = async (article_id) => {
    try {
        const sql = 'SELECT * FROM article WHERE article_id = ?';
        const [rows] = await pool.query(sql, [article_id]);
        return rows[0] || null;
    } catch (error) {
        console.error('查询文章详情错误:', error);
        throw error;
    }
};

// article_deleteById - 修复后
const article_deleteById = async (article_id, user_id) => {
    try {
        const sql = 'DELETE FROM article WHERE article_id = ? AND user = ?';
        const [result] = await pool.query(sql, [article_id, user_id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('删除文章错误:', error);
        throw error;
    }
};

// article_isPublic - 修复后
const article_isPublic = async (article_id) => {
    try {
        const sql = 'SELECT status FROM article WHERE article_id = ?';
        const [rows] = await pool.query(sql, [article_id]);
        if (rows.length === 0) {
            return false;
        }
        return rows[0].status === 1;
    } catch (error) {
        console.error('检查文章是否公开错误:', error);
        throw error;
    }
};
```

---

### 2. 密码明文返回 🚨

#### 问题代码

**文件**: [utils/db_curd.js#L54-69](file:///c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer\utils\db_curd.js#L54-69)

```javascript
const login_loginByEmail = async (email, password) => {
    try {
        const sql = 'SELECT * FROM user WHERE email = ?';
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const isPasswordValid = await ComparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user; // 🚨 返回了整个 user 对象，包含 password 字段
    } catch (error) {
        console.error('登录查询错误:', error);
        throw error;
    }
};
```

#### 正确实现

```javascript
const login_loginByEmail = async (email, password) => {
    try {
        const sql = 'SELECT * FROM user WHERE email = ?';
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const isPasswordValid = await ComparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        // ✅ 删除密码字段后再返回
        delete user.password;
        return user;
    } catch (error) {
        console.error('登录查询错误:', error);
        throw error;
    }
};

const login_loginByUsername = async (username, password) => {
    try {
        const sql = 'SELECT * FROM user WHERE username = ?';
        const [rows] = await pool.query(sql, [username]);
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const isPasswordValid = await ComparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        // ✅ 删除密码字段后再返回
        delete user.password;
        return user;
    } catch (error) {
        console.error('登录查询错误:', error);
        throw error;
    }
};
```

---

### 3. 环境变量中的敏感信息泄露 🚨

#### 问题

**.env 文件包含真实的数据库密码和 API Key，且可能被提交到 Git**

```bash
# .env 文件内容
DB_PASSWORD=13551458597a
JWT_SECRET=liheng
HUNYUAN_API_KEY=sk-2M3dYKEywnRniPICAbmd1nwgxRANewsDFE9pDq4YPQ1FUtlg
APP_SECRET=liheng_app
```

#### 正确做法

**步骤 1**: 确保 `.gitignore` 包含 `.env`

```gitignore
# .gitignore
node_modules/
.env
.env.*
```

**步骤 2**: 创建 `.env.example`（不包含真实值）

```bash
# .env.example - 模板文件
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=fastweb_test
JWT_SECRET=your_jwt_secret_here
PORT=7000
HUNYUAN_API_KEY=your_api_key_here
APP_SECRET=your_app_secret_here
```

**步骤 3**: 生产环境使用环境变量注入

```bash
# Linux/Mac
export DB_PASSWORD=real_password
export JWT_SECRET=real_secret

# Windows PowerShell
$env:DB_PASSWORD="real_password"

# Docker
docker run -e DB_PASSWORD=real_password -e JWT_SECRET=real_secret ...
```

---

## 二、命名不一致问题

### 1. 分类字段命名混乱 🚨

#### 问题

项目混用了 `cart_id`/`cart_name` 和 `category_id`/`category_name`

| 文件 | 使用的命名 |
|------|-----------|
| articl_request.js | `cart_id`, `cart_name` |
| db_curd.js | `cart_id`, `cart_name` |
| article_category_request.js | `category_id`, `category_name` |

#### 正确实现

**统一命名为 `category_id` 和 `category_name`**

修改 **db_curd.js**:

```javascript
// article_add - 修复后
const article_add = async (id, title, content, category_id, category_name, user_id) => {
    try {
        const sql = 'INSERT INTO article (id, title, content, category_id, category_name, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        await pool.query(sql, [id, title, content, category_id, category_name, user_id]);
        return true;
    } catch (error) {
        console.error('添加文章错误:', error);
        throw error;
    }
};

// article_postEdit - 修复后
const article_postEdit = async (id, title, content, category_id, category_name, user_id) => {
    try {
        const sql = 'UPDATE article SET title = ?, content = ?, category_id = ?, category_name = ? WHERE id = ? AND user_id = ?';
        await pool.query(sql, [title, content, category_id, category_name, id, user_id]);
        return true;
    } catch (error) {
        console.error('更新文章错误:', error);
        throw error;
    }
};
```

修改 **routes/articl_request.js**:

```javascript
// 添加文章 - 修复后
router.post('/article/add', async (req, res) => {
    const { id, title, content, category_id, category_name } = req.body;  // ✅ 统一命名
    if (!id || !title || !content || !category_id || !category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id、标题、内容、分类id、分类名称不能为空'
        });
    }
    const token = req.headers.authorization;
    const decoded = tokenValidator(token);
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        });
    }
    const user_id = decoded.id;
    try {
        const article = await article_add(id, title, content, category_id, category_name, user_id);
        res.json({
            code: 200,
            success: true,
            message: '添加成功',
            article: article
        });
    } catch (error) {
        console.error('添加文章错误:', error);
        res.status(500).json({
            success: false,
            message: '添加文章失败'
        });
    }
});

// 更新文章 - 修复后
router.put('/article/update', async (req, res) => {
    const { id, title, content, category_id, category_name } = req.body;  // ✅ 统一命名
    if (!id || !title || !content || !category_id || !category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '文章id、标题、内容、分类id、分类名称不能为空'
        });
    }
    const token = req.headers.authorization;
    const decoded = tokenValidator(token);
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        });
    }
    const user_id = decoded.id;
    try {
        const article = await article_postEdit(id, title, content, category_id, category_name, user_id);
        res.json({
            code: 200,
            success: true,
            message: '更新成功',
            article: article
        });
    } catch (error) {
        console.error('更新文章错误:', error);
        res.status(500).json({
            success: false,
            message: '更新文章失败'
        });
    }
});
```

---

### 2. 路由处理函数中的变量名错误 🚨

#### 问题代码

**文件**: [routes/articl_request.js#L109](file:///c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer\routes\articl_request.js#L109)

```javascript
router.get('/article/getSomeByPageAndCategory', async (req, res) => {
    const { page, page_size, category_id } = req.query;  // ✅ 定义了 category_id
    // ...
    const { total, articleList } = await article_getByCartIdByPage(user_id, cart_id, page, page_size);  // ❌ 使用了 cart_id（未定义）
});
```

#### 正确实现

```javascript
router.get('/article/getSomeByPageAndCategory', async (req, res) => {
    const { page, page_size, category_id } = req.query;
    if (!page || !page_size || !category_id) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '页码、每页数量、分类id不能为空'
        });
    }
    const token = req.headers.authorization;
    const decoded = tokenValidator(token);
    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        });
    }
    const user_id = decoded.id;
    try {
        // ✅ 修复：使用正确的变量名
        const { total, articleList } = await article_getByCategoryIdByPage(user_id, category_id, page, page_size);
        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                total: total,
                articleList: articleList
            }
        });
    } catch (error) {
        console.error('获取文章列表错误:', error);
        res.status(500).json({
            success: false,
            message: '获取文章列表失败'
        });
    }
});
```

---

## 三、代码重复问题

### 1. 登录接口重复代码 🚨

#### 问题代码

**文件**: [routes/login_request.js](file:///c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer\routes\login_request.js)

邮箱登录和用户名登录的代码几乎完全相同，只有查询条件不同。

#### 正确实现

```javascript
const express = require('express');
const router = express.Router();
const { login_loginByEmail, login_loginByUsername } = require('../utils/db_curd');
const { tokenCreator } = require('../utils/token_creator');

router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;

    // 参数校验
    if (!password) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '密码不能为空'
        });
    }

    if (!email && !username) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '邮箱或用户名不能为空'
        });
    }

    try {
        // 根据传入参数选择登录方式
        const loginType = email ? 'email' : 'username';
        const loginValue = email || username;

        const user = email
            ? await login_loginByEmail(email, password)
            : await login_loginByUsername(username, password);

        if (!user) {
            return res.status(401).json({
                code: 401,
                success: false,
                message: loginType === 'email' ? '邮箱或密码错误' : '用户名或密码错误'
            });
        }

        const token = tokenCreator(user);
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
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    }
});

module.exports = router;
```

---

## 四、ID 生成策略问题

### 1. 使用时间戳生成 ID 不安全 🚨

#### 问题代码

**文件**: [utils/id_creator.js](file:///c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer\utils\id_creator.js)

```javascript
const generateId = () => +Date.now()
```

**问题**:
1. 高并发下可能产生重复 ID
2. ID 可被预测
3. 不支持分布式系统

#### 正确实现

**方案 1: 使用 UUID（推荐）**

```bash
npm install uuid
```

```javascript
const { v4: uuidv4 } = require('uuid');

const generateId = () => {
    return uuidv4();  // 生成形如: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
};

module.exports = { generateId };
```

**方案 2: 使用 nanoid（轻量）**

```bash
npm install nanoid
```

```javascript
const { nanoid } = require('nanoid');

const generateId = () => {
    return nanoid();  // 生成形如: V1StGXR8_Z5jdHi6B
};

module.exports = { generateId };
```

**方案 3: 数据库自增 ID（最简单）**

```sql
-- 修改表结构，使用自增 ID
ALTER TABLE article MODIFY COLUMN id BIGINT AUTO_INCREMENT PRIMARY KEY;
```

```javascript
// 修改 db_curd.js 中的插入方法
const article_add = async (title, content, category_id, category_name, user_id) => {
    try {
        const sql = 'INSERT INTO article (title, content, category_id, category_name, user_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [title, content, category_id, category_name, user_id]);
        return { id: result.insertId, title, content, category_id, category_name, user_id };
    } catch (error) {
        console.error('添加文章错误:', error);
        throw error;
    }
};
```

---

## 五、其他常见问题

### 1. 错误处理不一致

#### 问题

有些接口返回 `res.status(500).send()`，有些返回 `res.status(500).json()`

```javascript
// articl_request.js - 不一致
res.status(500).send('获取文章列表失败', error.message)  // ❌ send 只能接受字符串
res.status(500).json({ success: false, message: '添加文章失败' })  // ✅ 正确
```

#### 正确实现

```javascript
// 统一使用 json
res.status(500).json({
    code: 500,
    success: false,
    message: '获取文章列表失败'
});
```

### 2. 缺少参数校验中间件

#### 问题

每个接口都要手动校验参数，容易遗漏

```javascript
// 每个接口都要写重复的校验代码
if (!id || !title || !content) {
    return res.status(400).json({ message: '参数不能为空' });
}
```

#### 正确实现

安装 `express-validator`:

```bash
npm install express-validator
```

创建验证中间件 `utils/validator.js`:

```javascript
const { body, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '参数验证失败',
            errors: errors.array()
        });
    }
    next();
};

const articleValidation = {
    add: [
        body('id').notEmpty().withMessage('文章ID不能为空'),
        body('title').notEmpty().withMessage('标题不能为空'),
        body('content').notEmpty().withMessage('内容不能为空'),
        body('category_id').notEmpty().withMessage('分类ID不能为空'),
        body('category_name').notEmpty().withMessage('分类名称不能为空'),
        validate
    ],
    update: [
        body('id').notEmpty().withMessage('文章ID不能为空'),
        body('title').notEmpty().withMessage('标题不能为空'),
        body('content').notEmpty().withMessage('内容不能为空'),
        validate
    ]
};

module.exports = { articleValidation };
```

使用:

```javascript
const { articleValidation } = require('../utils/validator');

router.post('/article/add', articleValidation.add, async (req, res) => {
    // 参数已经过验证，可以直接使用
    const { id, title, content, category_id, category_name } = req.body;
    // ...
});
```

---

## 六、快速检查清单

### 🔴 必须修复（安全问题）

- [ ] 所有 SQL 使用参数化查询
- [ ] 移除所有返回密码的代码
- [ ] `.env` 加入 `.gitignore`
- [ ] 真实凭据不要提交到 Git

### 🟡 建议修复（代码质量）

- [ ] 统一 `category_id` / `category_name` 命名
- [ ] 修复 `cart_id` 拼写错误
- [ ] 简化登录接口重复代码
- [ ] 统一错误响应格式
- [ ] 使用 ID 生成库替代时间戳

### 🟢 可选优化

- [ ] 添加参数验证中间件
- [ ] 添加统一错误处理
- [ ] 添加 Swagger 文档
