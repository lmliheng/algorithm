# Fast-NodeServer

Node.js + Express + MySQL 快速构建的 RESTful API 服务。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Express 4.18+ |
| 数据库 | MySQL 8.0+ / mysql2 |
| 认证 | JSON Web Token (JWT) |
| 密码加密 | bcrypt |
| 跨域 | cors |
| 环境变量 | dotenv |

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- MySQL 8.0+

### 安装依赖

```bash
npm install
```

### 配置环境

1. 复制环境配置示例：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，配置数据库连接：
   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=fastweb
   JWT_SECRET=your_secret_key
   ```

### 初始化数据库

执行 SQL 文件创建数据库和表：
```bash
mysql -u root -p < asset/sql/fastweb_2026-04-11_174205.sql
```

### 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务默认运行在 `http://localhost:7000`

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /login | 用户登录 |
| GET | /userInfo | 获取用户信息 |
| PUT | /userInfo | 更新用户信息 |
| GET | /article/getAll | 获取所有文章 |
| GET | /article/getAllByPage | 分页获取文章 |
| POST | /article/create | 创建文章 |
| PUT | /article/update | 更新文章 |
| DELETE | /article/delete | 删除文章 |
| GET | /articleCart/getAll | 获取所有分类 |
| POST | /articleCart/create | 创建分类 |
| PUT | /articleCart/update | 更新分类 |
| DELETE | /articleCart/delete | 删除分类 |

## 项目结构

```
├── asset/
│   └── sql/           # 数据库 SQL 文件
├── router/            # 路由处理
├── utils/             # 工具函数
├── .env               # 环境配置
├── server.js          # 入口文件
└── package.json
```
