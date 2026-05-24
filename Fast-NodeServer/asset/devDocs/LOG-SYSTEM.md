# Fast-NodeServer 日志系统实现方案

> 本文档提供完整的日志系统实现，解决项目缺少日志记录的问题。

---

## 一、日志系统概述

### 需求分析

1. **访问日志**: 记录每个请求的 method、url、ip、响应时间
2. **错误日志**: 记录服务器错误、数据库错误等
3. **业务日志**: 记录登录、注册、文章操作等业务事件
4. **日志轮转**: 自动按日期切割日志文件
5. **分级控制**: 支持 DEBUG、INFO、WARN、ERROR 等级别

### 技术方案

| 方案 | 优点 | 缺点 |
|------|------|------|
| Winston | 功能完善、支持多传输、扩展性好 | 需要额外依赖 |
| Log4js | 性能好、支持自动刷新 | 配置较复杂 |
| 原生 console | 无需依赖 | 功能有限 |

**推荐方案**: Winston + DailyRotateFile（满足所有需求）

---

## 二、安装依赖

```bash
npm install winston daily-rotate-file
```

---

## 三、日志模块实现

### 1. 创建日志工具文件

**文件**: `utils/logger.js`

```javascript
const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        // 错误日志 - 单独记录
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'error', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '20m',
            maxFiles: '30d'
        }),
        // 访问日志
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'access', 'access-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d'
        }),
        // 业务日志
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'business', 'business-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d'
        }),
        // 所有日志
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'combined', 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d'
        })
    ]
});

// 添加控制台输出（开发环境）
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        )
    }));
}

module.exports = logger;
```

### 2. 创建访问日志中间件

**文件**: `middleware/accessLogger.js`

```javascript
const logger = require('../utils/logger');

const accessLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl || req.url,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent') || 'unknown',
            status: res.statusCode,
            duration: `${duration}ms`,
            userId: req.user?.id || 'guest',
            timestamp: new Date().toISOString()
        };

        if (res.statusCode >= 400) {
            logger.warn('访问日志', logData);
        } else {
            logger.info('访问日志', logData);
        }
    });

    next();
};

module.exports = accessLogger;
```

### 3. 创建错误日志中间件

**文件**: `middleware/errorHandler.js`

```javascript
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    const errorData = {
        name: err.name,
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id || 'guest',
        body: req.body,
        timestamp: new Date().toISOString()
    };

    logger.error('错误日志', errorData);

    const statusCode = err.statusCode || 500;
    const message = err.message || '服务器内部错误';

    res.status(statusCode).json({
        code: statusCode,
        success: false,
        message: process.env.NODE_ENV === 'production' ? message : err.message
    });
};

module.exports = errorHandler;
```

### 4. 业务日志工具

**文件**: `utils/businessLogger.js`

```javascript
const logger = require('./logger');

class BusinessLogger {
    // 用户相关日志
    static login(userId, username, email, success) {
        logger.info('用户登录', {
            type: 'LOGIN',
            userId,
            username,
            email,
            success,
            message: success ? '登录成功' : '登录失败'
        });
    }

    static register(userId, username, email, success) {
        logger.info('用户注册', {
            type: 'REGISTER',
            userId,
            username,
            email,
            success,
            message: success ? '注册成功' : '注册失败'
        });
    }

    // 文章相关日志
    static articleAdd(userId, articleId, title, success) {
        logger.info('添加文章', {
            type: 'ARTICLE_ADD',
            userId,
            articleId,
            title,
            success
        });
    }

    static articleUpdate(userId, articleId, title, success) {
        logger.info('更新文章', {
            type: 'ARTICLE_UPDATE',
            userId,
            articleId,
            title,
            success
        });
    }

    static articleDelete(userId, articleId, success) {
        logger.info('删除文章', {
            type: 'ARTICLE_DELETE',
            userId,
            articleId,
            success
        });
    }

    // 分类相关日志
    static categoryAdd(userId, categoryId, categoryName, success) {
        logger.info('添加分类', {
            type: 'CATEGORY_ADD',
            userId,
            categoryId,
            categoryName,
            success
        });
    }

    // AI 对话日志
    static aiChat(userId, model, promptLength, responseTime, success) {
        logger.info('AI 对话', {
            type: 'AI_CHAT',
            userId,
            model,
            promptLength,
            responseTime,
            success
        });
    }

    // 安全相关日志
    static authFailed(ip, reason, endpoint) {
        logger.warn('认证失败', {
            type: 'AUTH_FAILED',
            ip,
            reason,
            endpoint,
            message: reason
        });
    }

    static permissionDenied(userId, resource, action) {
        logger.warn('权限不足', {
            type: 'PERMISSION_DENIED',
            userId,
            resource,
            action,
            message: `用户 ${userId} 尝试 ${action} ${resource} 但权限不足`
        });
    }
}

module.exports = BusinessLogger;
```

---

## 四、集成到项目

### 1. 创建 middleware 目录

```bash
mkdir -p middleware
```

### 2. 修改 server.js

**文件**: `server.js`

```javascript
const express = require('express');
const { testConnection } = require('./utils/connect_db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// 引入日志中间件
const { accessLogger } = require('./middleware/accessLogger');
const errorHandler = require('./middleware/errorHandler');

// 使用日志中间件（最早加载）
app.use(accessLogger);

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use(require('./routes/login_request'));
app.use(require('./routes/register_request'));
app.use(require('./routes/articl_request'));
app.use(require('./routes/article_category_request'));
app.use(require('./routes/user_request'));
app.use(require('./routes/hunyuan_request'));

// 错误处理中间件（最后加载）
app.use(errorHandler);

// 启动服务器
async function startServer() {
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('数据库连接失败');
        process.exit(1);
    }
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
        console.log(`服务器运行在端口 ${PORT}`);
    });
}

startServer();
```

---

## 五、在业务代码中使用

### 1. 修改登录接口

**文件**: `routes/login_request.js`

```javascript
const express = require('express');
const router = express.Router();
const { login_loginByEmail, login_loginByUsername } = require('../utils/db_curd');
const { tokenCreator } = require('../utils/token_creator');
const BusinessLogger = require('../utils/businessLogger');

router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;

    if (!password || (!email && !username)) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '密码和邮箱/用户名不能为空'
        });
    }

    try {
        const loginType = email ? 'email' : 'username';
        const loginValue = email || username;

        const user = email
            ? await login_loginByEmail(email, password)
            : await login_loginByUsername(username, password);

        if (!user) {
            // 记录登录失败
            BusinessLogger.login(null, username, email, false);
            BusinessLogger.authFailed(req.ip, '密码错误或用户不存在', '/login');
            return res.status(401).json({
                code: 401,
                success: false,
                message: '邮箱或密码错误'
            });
        }

        const token = tokenCreator(user);
        // 记录登录成功
        BusinessLogger.login(user.id, user.username, user.email, true);

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

### 2. 修改文章操作接口

**文件**: `routes/articl_request.js`

```javascript
const BusinessLogger = require('../utils/businessLogger');

// 添加文章
router.post('/article/add', async (req, res) => {
    const { id, title, content, category_id, category_name } = req.body;
    // ... 参数校验 ...

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
        // 记录文章添加
        BusinessLogger.articleAdd(user_id, id, title, true);

        res.json({
            code: 200,
            success: true,
            message: '添加成功',
            article: article
        });
    } catch (error) {
        BusinessLogger.articleAdd(user_id, id, title, false);
        console.error('添加文章错误:', error);
        res.status(500).json({
            success: false,
            message: '添加文章失败'
        });
    }
});

// 删除文章
router.delete('/article/delete', async (req, res) => {
    const { id } = req.query;
    // ... 参数校验 ...

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
        const article = await article_deleteById(id, user_id);
        // 记录文章删除
        BusinessLogger.articleDelete(user_id, id, true);

        res.json({
            code: 200,
            success: true,
            message: '删除成功'
        });
    } catch (error) {
        BusinessLogger.articleDelete(user_id, id, false);
        console.error('删除文章错误:', error);
        res.status(500).json({
            success: false,
            message: '删除文章失败'
        });
    }
});
```

---

## 六、日志输出示例

### 日志文件结构

```
logs/
├── error/
│   ├── error-2026-05-08.log
│   └── error-2026-05-07.log
├── access/
│   ├── access-2026-05-08.log
│   └── access-2026-05-07.log
├── business/
│   ├── business-2026-05-08.log
│   └── business-2026-05-07.log
└── combined/
    ├── combined-2026-05-08.log
    └── combined-2026-05-07.log
```

### 日志内容示例

**error-2026-05-08.log**:
```
2026-05-08 10:30:15 [ERROR]: 错误日志
    name: ValidationError
    message: 文章ID不能为空
    stack: Error: 文章ID不能为空
        at article_add (D:\project\routes\articl_request.js:50)
        at Layer.handle [as handle_request] (D:\project\node_modules\express\lib\router\layer.js:95)
        ...
```

**access-2026-05-08.log**:
```
2026-05-08 10:30:15 [INFO]: 访问日志
    method: POST
    url: /article/add
    ip: 127.0.0.1
    status: 200
    duration: 45ms
    userId: 1234567890
    timestamp: 2026-05-08T10:30:15.000Z
```

**business-2026-05-08.log**:
```
2026-05-08 10:25:30 [INFO]: 用户登录
    type: LOGIN
    userId: 1234567890
    username: testuser
    email: test@example.com
    success: true
    message: 登录成功

2026-05-08 10:26:00 [INFO]: 添加文章
    type: ARTICLE_ADD
    userId: 1234567890
    articleId: 1746691200000
    title: 我的第一篇文章
    success: true

2026-05-08 10:27:00 [WARN]: 认证失败
    type: AUTH_FAILED
    ip: 192.168.1.100
    reason: Token已过期
    endpoint: /userInfo
    message: Token已过期
```

---

## 七、可选增强功能

### 1. 添加日志查询 API

**文件**: `routes/log_request.js`

```javascript
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { tokenValidator } = require('../utils/token_creator');

router.get('/logs/error', async (req, res) => {
    const token = req.headers.authorization;
    const decoded = tokenValidator(token);

    // 仅管理员可查看
    if (!decoded || decoded.id !== 1) {
        return res.status(403).json({
            code: 403,
            success: false,
            message: '权限不足'
        });
    }

    const { date } = req.query;
    const logFile = path.join(__dirname, `../logs/error/error-${date || 'YYYY-MM-DD'}.log`);

    try {
        if (!fs.existsSync(logFile)) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: '日志文件不存在'
            });
        }
        const content = fs.readFileSync(logFile, 'utf-8');
        res.json({
            code: 200,
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: '读取日志失败'
        });
    }
});

module.exports = router;
```

### 2. 添加 ELK 日志收集支持（可选）

```javascript
// utils/logger.js 添加
const Transport = require('winston-transport');

class ElasticsearchTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.client = opts.client; // Elasticsearch client
    }

    log(info, callback) {
        setImmediate(() => this.emit('logged', info));
        // 发送到 Elasticsearch
        this.client.index({
            index: 'fast-node-server-logs',
            body: info
        });
        callback();
    }
}
```

---

## 八、总结

通过以上实现，你将获得：

| 功能 | 状态 | 说明 |
|------|------|------|
| 访问日志 | ✅ | 记录所有 HTTP 请求 |
| 错误日志 | ✅ | 记录所有错误，含堆栈 |
| 业务日志 | ✅ | 记录登录、文章等业务事件 |
| 日志轮转 | ✅ | 按日期自动切割，保留 30 天 |
| 分级控制 | ✅ | DEBUG/INFO/WARN/ERROR |
| 控制台输出 | ✅ | 开发环境彩色输出 |
| 生产优化 | ✅ | 生产环境关闭控制台 |

修改 `server.js` 启用日志系统后，你的项目将具备完整的日志能力。
