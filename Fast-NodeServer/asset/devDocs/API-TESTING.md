# Fast-NodeServer 接口快速测试指南

> 本文档介绍多种快速测试 API 接口的方法，包括 Postman、curl、Apifox、Bruno 等工具的使用。

---

## 一、环境准备

### 1. 启动服务器

```bash
# 进入项目目录
cd c:\Users\Administrator\Desktop\work\github_proj\Fast-NodeServer

# 安装依赖（首次）
npm install

# 启动服务器
npm start
```

服务器将在 `http://localhost:7000` 运行。

### 2. 基础信息

| 项目 | 值 |
|------|-----|
| 基础 URL | `http://localhost:7000` |
| Content-Type | `application/json` |
| 认证方式 | JWT Bearer Token |

---

## 二、测试用户注册和登录

### 1. 用户注册

**接口**: `POST /register`

**请求体**:
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
}
```

**curl 命令**:
```bash
curl -X POST http://localhost:7000/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"123456\"}"
```

**Postman/Apifox**:
```
Method: POST
URL: http://localhost:7000/register
Headers:
  Content-Type: application/json
Body (raw JSON):
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
}
```

**成功响应**:
```json
{
    "code": 200,
    "success": true,
    "message": "注册成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_info": {
        "id": "1746691200000",
        "username": "testuser",
        "email": "test@example.com"
    }
}
```

### 2. 用户登录（邮箱）

**接口**: `POST /login`

**请求体**:
```json
{
    "email": "test@example.com",
    "password": "123456"
}
```

**curl 命令**:
```bash
curl -X POST http://localhost:7000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"123456\"}"
```

### 3. 用户登录（用户名）

**接口**: `POST /login`

**请求体**:
```json
{
    "username": "testuser",
    "password": "123456"
}
```

**curl 命令**:
```bash
curl -X POST http://localhost:7000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"123456\"}"
```

**成功响应**:
```json
{
    "code": 200,
    "success": true,
    "message": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_info": {
        "id": "1746691200000",
        "username": "testuser",
        "email": "test@example.com",
        "login_time": "2026/5/8 10:30:00"
    }
}
```

**⚠️ 重要**: 复制返回的 `token` 值，后续请求需要在 Header 中携带。

---

## 三、测试文章接口（需要认证）

### 1. 添加文章

**接口**: `POST /article/add`

**Headers**:
```
Authorization: Bearer <替换为你的token>
Content-Type: application/json
```

**请求体**:
```json
{
    "id": "1746691300000",
    "title": "我的第一篇文章",
    "content": "这是文章内容，支持 Markdown 格式。",
    "category_id": "1",
    "category_name": "技术"
}
```

**curl 命令**:
```bash
curl -X POST http://localhost:7000/article/add ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":\"1746691300000\",\"title\":\"我的第一篇文章\",\"content\":\"这是文章内容\",\"category_id\":\"1\",\"category_name\":\"技术\"}"
```

### 2. 获取用户文章列表（分页）

**接口**: `GET /article/getAllByPage?page=1&page_size=10`

**Headers**:
```
Authorization: Bearer <替换为你的token>
```

**curl 命令**:
```bash
curl -X GET "http://localhost:7000/article/getAllByPage?page=1&page_size=10" ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. 更新文章

**接口**: `PUT /article/update`

**请求体**:
```json
{
    "id": "1746691300000",
    "title": "更新后的标题",
    "content": "更新后的内容",
    "category_id": "1",
    "category_name": "技术"
}
```

**curl 命令**:
```bash
curl -X PUT http://localhost:7000/article/update ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":\"1746691300000\",\"title\":\"更新后的标题\",\"content\":\"更新后的内容\",\"category_id\":\"1\",\"category_name\":\"技术\"}"
```

### 4. 删除文章

**接口**: `DELETE /article/delete?id=1746691300000`

**curl 命令**:
```bash
curl -X DELETE "http://localhost:7000/article/delete?id=1746691300000" ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 四、测试分类接口

### 1. 获取本用户分类列表

**接口**: `GET /articleCart/getAllByUserId`

**curl 命令**:
```bash
curl -X GET http://localhost:7000/articleCart/getAllByUserId ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 2. 添加分类

**接口**: `POST /articleCart/add`

**请求体**:
```json
{
    "category_id": "1",
    "category_name": "技术"
}
```

**curl 命令**:
```bash
curl -X POST http://localhost:7000/articleCart/add ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ^
  -H "Content-Type: application/json" ^
  -d "{\"category_id\":\"1\",\"category_name\":\"技术\"}"
```

### 3. 获取某分类下的文章

**接口**: `GET /articleCart/getArticleListByUserId?category_id=1`

**curl 命令**:
```bash
curl -X GET "http://localhost:7000/articleCart/getArticleListByUserId?category_id=1" ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 五、测试用户接口

### 1. 获取用户信息

**接口**: `GET /userInfo`

**curl 命令**:
```bash
curl -X GET http://localhost:7000/userInfo ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**成功响应**:
```json
{
    "code": 200,
    "success": true,
    "message": "获取用户信息成功",
    "user_info": {
        "user_detail": {
            "id": "1746691200000",
            "username": "testuser",
            "email": "test@example.com",
            "avatar": null,
            "role_name": "管理员",
            "role_id": 1,
            "created_at": "2026-05-08T10:30:00.000Z"
        },
        "user_permission": [
            { "permission_name": "用户管理", "permission_id": 1 },
            { "permission_name": "文章管理", "permission_id": 2 }
        ],
        "login_time": "2026/5/8 10:30:00"
    }
}
```

### 2. 更新用户信息

**接口**: `PUT /userInfo`

**请求体**:
```json
{
    "id": "1746691200000",
    "username": "newusername",
    "email": "new@example.com"
}
```

### 3. 重置密码

**接口**: `POST /resetPassword`

**请求体**:
```json
{
    "password": "newpassword123"
}
```

---

## 六、测试 AI 对话接口

### 1. 单轮对话

**接口**: `GET /singlechat?prompt=写一个快速排序算法`

**curl 命令**:
```bash
curl -X GET "http://localhost:7000/singlechat?prompt=%E5%86%99%E4%B8%80%E4%B8%AA%E5%BF%85%E5%8F%AF%E8%AF%A5" ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 七、快速测试脚本

### 1. PowerShell 自动化测试脚本

**文件**: `test-api.ps1`

```powershell
$BASE_URL = "http://localhost:7000"
$TOKEN = ""

Write-Host "=== Fast-NodeServer API 测试 ===" -ForegroundColor Cyan

# 1. 测试注册
Write-Host "`n[1] 测试用户注册..." -ForegroundColor Yellow
$registerResponse = Invoke-RestMethod -Uri "$BASE_URL/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body (@{
        username = "apitest"
        email = "apitest@example.com"
        password = "123456"
    } | ConvertTo-Json)

Write-Host "注册结果: $($registerResponse.message)" -ForegroundColor Green
$TOKEN = $registerResponse.token

# 2. 测试登录
Write-Host "`n[2] 测试用户登录..." -ForegroundColor Yellow
$loginResponse = Invoke-RestMethod -Uri "$BASE_URL/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body (@{
        email = "apitest@example.com"
        password = "123456"
    } | ConvertTo-Json)

Write-Host "登录结果: $($loginResponse.message)" -ForegroundColor Green
$TOKEN = $loginResponse.token

# 3. 获取用户信息
Write-Host "`n[3] 测试获取用户信息..." -ForegroundColor Yellow
$userInfoResponse = Invoke-RestMethod -Uri "$BASE_URL/userInfo" `
    -Method Get `
    -Headers @{ "Authorization" = "Bearer $TOKEN" }

Write-Host "用户名: $($userInfoResponse.user_info.user_detail.username)" -ForegroundColor Green

# 4. 添加文章
Write-Host "`n[4] 测试添加文章..." -ForegroundColor Yellow
$addArticleResponse = Invoke-RestMethod -Uri "$BASE_URL/article/add" `
    -Method Post `
    -ContentType "application/json" `
    -Headers @{ "Authorization" = "Bearer $TOKEN" } `
    -Body (@{
        id = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
        title = "API测试文章"
        content = "这是通过API测试创建的文章"
        category_id = "1"
        category_name = "测试"
    } | ConvertTo-Json)

Write-Host "添加文章: $($addArticleResponse.message)" -ForegroundColor Green

# 5. 获取文章列表
Write-Host "`n[5] 测试获取文章列表..." -ForegroundColor Yellow
$articleListResponse = Invoke-RestMethod -Uri "$BASE_URL/article/getAllByPage?page=1&page_size=10" `
    -Method Get `
    -Headers @{ "Authorization" = "Bearer $TOKEN" }

Write-Host "文章总数: $($articleListResponse.data.total)" -ForegroundColor Green

# 6. 添加分类
Write-Host "`n[6] 测试添加分类..." -ForegroundColor Yellow
$addCategoryResponse = Invoke-RestMethod -Uri "$BASE_URL/articleCart/add" `
    -Method Post `
    -ContentType "application/json" `
    -Headers @{ "Authorization" = "Bearer $TOKEN" } `
    -Body (@{
        category_id = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
        category_name = "API测试分类"
    } | ConvertTo-Json)

Write-Host "添加分类: $($addCategoryResponse.message)" -ForegroundColor Green

Write-Host "`n=== 所有测试完成 ===" -ForegroundColor Cyan
```

**运行方式**:
```powershell
.\test-api.ps1
```

### 2. Bash 自动化测试脚本

**文件**: `test-api.sh`

```bash
#!/bin/bash

BASE_URL="http://localhost:7000"
TOKEN=""

echo "=== Fast-NodeServer API 测试 ==="

# 1. 测试注册
echo "[1] 测试用户注册..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
    -H "Content-Type: application/json" \
    -d '{"username":"apitest","email":"apitest@example.com","password":"123456"}')
echo "$REGISTER_RESPONSE" | jq .

TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')

# 2. 测试登录
echo "[2] 测试用户登录..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"apitest@example.com","password":"123456"}')
echo "$LOGIN_RESPONSE" | jq .

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

# 3. 获取用户信息
echo "[3] 测试获取用户信息..."
curl -s -X GET "$BASE_URL/userInfo" \
    -H "Authorization: Bearer $TOKEN" | jq .

# 4. 添加文章
echo "[4] 测试添加文章..."
curl -s -X POST "$BASE_URL/article/add" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$(date +%s)000\",\"title\":\"API测试文章\",\"content\":\"测试内容\",\"category_id\":\"1\",\"category_name\":\"测试\"}" | jq .

# 5. 获取文章列表
echo "[5] 测试获取文章列表..."
curl -s -X GET "$BASE_URL/article/getAllByPage?page=1&page_size=10" \
    -H "Authorization: Bearer $TOKEN" | jq .

echo "=== 所有测试完成 ==="
```

**运行方式**:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 八、Apifox 使用指南

### 1. 导入项目

1. 下载并安装 [Apifox](https://www.apifox.com/)
2. 创建新项目 `Fast-NodeServer`
3. 添加环境 `Development`，设置 `BASE_URL = http://localhost:7000`

### 2. 创建接口集合

```
Fast-NodeServer
├── 认证模块
│   ├── POST /register
│   └── POST /login
├── 用户模块
│   ├── GET /userInfo
│   ├── PUT /userInfo
│   └── POST /resetPassword
├── 文章模块
│   ├── GET /article/getAllByPage
│   ├── POST /article/add
│   ├── PUT /article/update
│   └── DELETE /article/delete
├── 分类模块
│   ├── GET /articleCart/getAllByUserId
│   ├── POST /articleCart/add
│   └── GET /articleCart/getArticleListByUserId
└── AI 模块
    └── GET /singlechat
```

### 3. 设置全局变量

在「项目设置」→「环境变量」中添加：

| 变量名 | 类型 | 值 |
|--------|------|-----|
| `baseUrl` | String | `http://localhost:7000` |
| `token` | String | `{{token}}` |

### 4. 认证流程设置

1. 创建「认证」接口集合
2. 在「登录接口」的「后置操作」中添加脚本：

```javascript
// 获取返回的 token
const token = pm.response.json().token;
// 设置为全局变量
pm.globals.set("token", token);
```

3. 在需要认证的接口「前置操作」中添加：

```javascript
// 从全局变量获取 token
const token = pm.globals.get("token");
if (token) {
    pm.request.headers.add({
        key: "Authorization",
        value: `Bearer ${token}`
    });
}
```

### 5. 批量测试

1. 选择集合
2. 点击「运行」按钮
3. 选择环境
4. 点击「开始循环运行」

---

## 九、Bruno 使用指南

[Bruno](https://www.usebruno.com/) 是一个开源的 API 客户端，支持 Git 版本控制。

### 1. 创建 Collection

在项目根目录创建 `bruno` 文件夹，结构如下：

```
bruno/
└── Fast-NodeServer/
    ├── bru.conf.js
    └── auth/
        ├── login.bru
        └── register.bru
```

### 2. 定义接口

**文件**: `bruno/Fast-NodeServer/auth/login.bru`

```bru
meta {
  name: Login
  type: http
  seq: 1
}

post {
  url: {{baseUrl}}/login
  body: json
  auth: none
}

body:json {
  {
    "email": "test@example.com",
    "password": "123456"
  }
}

vars:post-response {
  token: response.body.token
}
```

**文件**: `bruno/Fast-NodeServer/auth/register.bru`

```bru
meta {
  name: Register
  type: http
  seq: 2
}

post {
  url: {{baseUrl}}/register
  body: json
  auth: none
}

body:json {
  {
    "username": "brunotest",
    "email": "brunotest@example.com",
    "password": "123456"
  }
}
```

**文件**: `bruno/Fast-NodeServer/env.json`

```json
{
  "name": "Development",
  "vars": {
    "baseUrl": "http://localhost:7000"
  }
}
```

---

## 十、VS Code REST Client 插件

### 1. 安装插件

在 VS Code 中安装 `REST Client` 插件。

### 2. 创建测试文件

**文件**: `api-test.http`

```http
### 1. 注册用户
POST http://localhost:7000/register
Content-Type: application/json

{
    "username": "httptest",
    "email": "httptest@example.com",
    "password": "123456"
}

### 2. 登录
POST http://localhost:7000/login
Content-Type: application/json

{
    "email": "httptest@example.com",
    "password": "123456"
}

### 3. 获取用户信息 (需要认证)
GET http://localhost:7000/userInfo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### 4. 添加文章
POST http://localhost:7000/article/add
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
    "id": "1746692000000",
    "title": "HTTP Client 测试文章",
    "content": "这是使用 VS Code REST Client 测试创建的文章",
    "category_id": "1",
    "category_name": "测试"
}

### 5. 获取文章列表
GET http://localhost:7000/article/getAllByPage?page=1&page_size=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### 6. AI 对话测试
GET http://localhost:7000/singlechat?prompt=%E4%BD%A0%E5%A5%BD
```

### 3. 发送请求

- 点击 `Send Request` 链接或使用快捷键 `Ctrl+Alt+R`
- 响应将显示在右侧

---

## 十一、常见问题

### 1. Token 过期

**错误响应**:
```json
{
    "code": 401,
    "success": false,
    "message": "未授权"
}
```

**解决**: 重新登录获取新 Token

### 2. 参数缺失

**错误响应**:
```json
{
    "code": 400,
    "success": false,
    "message": "文章id、标题、内容不能为空"
}
```

**解决**: 检查请求体是否包含所有必填参数

### 3. SQL 注入测试

```bash
# 测试是否存在 SQL 注入
curl -X GET "http://localhost:7000/article/detail?article_id=1%20OR%201=1"
```

如果返回所有文章，说明存在 SQL 注入漏洞（需要修复）。

---

## 十二、测试数据清理

```sql
-- 清理测试数据
DELETE FROM user WHERE email LIKE '%@apitest.com';
DELETE FROM article WHERE title LIKE '%测试%';
DELETE FROM article_category WHERE category_name LIKE '%测试%';
```

---

## 总结

| 工具 | 适用场景 | 难度 |
|------|----------|------|
| curl | 快速验证、CI/CD | ⭐ |
| PowerShell/Bash 脚本 | 批量测试、自动化 | ⭐⭐ |
| Postman | 团队协作、复杂测试 | ⭐⭐ |
| Apifox | 中文界面、功能全面 | ⭐⭐ |
| Bruno | 开源、Git 兼容 | ⭐⭐ |
| VS Code REST Client | 轻量、无需切换应用 | ⭐ |

根据你的需求选择合适的测试工具即可！
