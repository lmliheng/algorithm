# Fast-NodeServer 后台管理系统实现方案

> 本文档提供完整的后台管理应用实现，包括用户管理、文章管理、权限管理和数据统计功能。

---

## 一、后台管理系统概述

### 功能模块

```
后台管理系统
├── 用户管理
│   ├── 用户列表
│   ├── 用户搜索/筛选
│   ├── 编辑用户信息
│   ├── 重置密码
│   └── 启用/禁用用户
├── 文章管理
│   ├── 文章列表（全部用户）
│   ├── 文章搜索/筛选
│   ├── 编辑文章
│   ├── 删除文章
│   └── 文章审核（可选）
├── 分类管理
│   ├── 分类列表
│   ├── 添加分类
│   ├── 编辑分类
│   └── 删除分类
├── 权限管理
│   ├── 角色列表
│   ├── 添加角色
│   ├── 编辑角色
│   └── 分配权限
├── 系统设置
│   ├── 站点信息
│   ├── 邮箱配置
│   └── AI 配置
└── 数据统计
    ├── 用户统计
    ├── 文章统计
    └── 访问统计
```

---

## 二、技术方案

### 前端技术

| 技术 | 说明 |
|------|------|
| Vue 3 / React | 建议 Vue 3 |
| Element Plus / Ant Design | UI 组件库 |
| Axios | HTTP 客户端 |
| Vue Router | 路由管理 |
| Pinia / Redux | 状态管理 |

### 后端 API 设计

| 接口 | 方法 | 说明 | 权限 |
|------|------|------|------|
| `/admin/users` | GET | 获取用户列表 | 管理员 |
| `/admin/users/:id` | PUT | 更新用户信息 | 管理员 |
| `/admin/users/:id/password` | POST | 重置用户密码 | 管理员 |
| `/admin/users/:id/status` | PUT | 启用/禁用用户 | 管理员 |
| `/admin/articles` | GET | 获取全部文章 | 管理员 |
| `/admin/articles/:id` | DELETE | 删除文章 | 管理员 |
| `/admin/categories` | GET | 获取分类列表 | 管理员 |
| `/admin/categories` | POST | 添加分类 | 管理员 |
| `/admin/categories/:id` | PUT | 更新分类 | 管理员 |
| `/admin/categories/:id` | DELETE | 删除分类 | 管理员 |
| `/admin/stats` | GET | 获取统计数据 | 管理员 |
| `/admin/logs` | GET | 获取日志列表 | 管理员 |

---

## 三、后端 API 实现

### 1. 创建后台管理路由

**文件**: `routes/admin_request.js`

```javascript
const express = require('express');
const router = express.Router();
const { pool } = require('../utils/connect_db');
const { tokenValidator } = require('../utils/token_creator');
const { ToHash } = require('../utils/bcrypt_password');

// 管理员权限中间件
const adminOnly = async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = tokenValidator(token);

    if (!decoded) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: '未授权'
        });
    }

    // 检查是否为管理员 (role_id = 1)
    try {
        const [rows] = await pool.query('SELECT role_id FROM user WHERE id = ?', [decoded.id]);
        if (rows.length === 0 || rows[0].role_id !== 1) {
            return res.status(403).json({
                code: 403,
                success: false,
                message: '权限不足，需要管理员权限'
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: '服务器内部错误'
        });
    }
};

// ============================================
// 用户管理
// ============================================

// 获取用户列表
router.get('/users', adminOnly, async (req, res) => {
    const { page = 1, page_size = 10, keyword = '', status = '' } = req.query;

    try {
        let whereClause = '';
        const params = [];

        if (keyword) {
            whereClause = 'WHERE (u.username LIKE ? OR u.email LIKE ?)';
            params.push(`%${keyword}%`, `%${keyword}%`);
        }

        if (status !== '') {
            whereClause += whereClause ? ' AND u.status = ?' : 'WHERE u.status = ?';
            params.push(status);
        }

        // 查询用户列表
        const offset = (page - 1) * page_size;
        const listSql = `
            SELECT u.id, u.username, u.email, u.avatar, u.status, u.created_at, u.updated_at, r.role_name
            FROM user u
            LEFT JOIN role r ON u.role_id = r.role_id
            ${whereClause}
            ORDER BY u.created_at DESC
            LIMIT ? OFFSET ?
        `;

        // 查询总数
        const countSql = `SELECT COUNT(*) as total FROM user u ${whereClause}`;

        const [listRows] = await pool.query(listSql, [...params, parseInt(page_size), offset]);
        const [countRows] = await pool.query(countSql, params);

        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                total: countRows[0].total,
                list: listRows
            }
        });
    } catch (error) {
        console.error('获取用户列表错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '获取用户列表失败'
        });
    }
});

// 更新用户信息
router.put('/users/:id', adminOnly, async (req, res) => {
    const { id } = req.params;
    const { username, email, role_id } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '用户名和邮箱不能为空'
        });
    }

    try {
        const sql = 'UPDATE user SET username = ?, email = ?, role_id = ? WHERE id = ?';
        await pool.query(sql, [username, email, role_id || 2, id]);

        res.json({
            code: 200,
            success: true,
            message: '更新成功'
        });
    } catch (error) {
        console.error('更新用户信息错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '更新用户信息失败'
        });
    }
});

// 重置用户密码
router.post('/users/:id/password', adminOnly, async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '密码长度不能少于6位'
        });
    }

    try {
        const hashedPassword = await ToHash(password);
        await pool.query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, id]);

        res.json({
            code: 200,
            success: true,
            message: '密码重置成功'
        });
    } catch (error) {
        console.error('重置密码错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '重置密码失败'
        });
    }
});

// 启用/禁用用户
router.put('/users/:id/status', adminOnly, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== 0 && status !== 1) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '状态值无效'
        });
    }

    try {
        await pool.query('UPDATE user SET status = ? WHERE id = ?', [status, id]);

        res.json({
            code: 200,
            success: true,
            message: status === 1 ? '用户已启用' : '用户已禁用'
        });
    } catch (error) {
        console.error('更新用户状态错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '更新用户状态失败'
        });
    }
});

// ============================================
// 文章管理
// ============================================

// 获取全部文章列表（支持筛选）
router.get('/articles', adminOnly, async (req, res) => {
    const { page = 1, page_size = 10, keyword = '', status = '', category_id = '' } = req.query;

    try {
        let whereClause = 'WHERE 1=1';
        const params = [];

        if (keyword) {
            whereClause += ' AND (a.title LIKE ? OR a.content LIKE ?)';
            params.push(`%${keyword}%`, `%${keyword}%`);
        }

        if (status !== '') {
            whereClause += ' AND a.status = ?';
            params.push(status);
        }

        if (category_id) {
            whereClause += ' AND a.category_id = ?';
            params.push(category_id);
        }

        const offset = (page - 1) * page_size;
        const listSql = `
            SELECT a.*, u.username, c.category_name
            FROM article a
            LEFT JOIN user u ON a.user_id = u.id
            LEFT JOIN article_category c ON a.category_id = c.category_id
            ${whereClause}
            ORDER BY a.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const countSql = `SELECT COUNT(*) as total FROM article a ${whereClause}`;

        const [listRows] = await pool.query(listSql, [...params, parseInt(page_size), offset]);
        const [countRows] = await pool.query(countSql, params);

        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                total: countRows[0].total,
                list: listRows
            }
        });
    } catch (error) {
        console.error('获取文章列表错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '获取文章列表失败'
        });
    }
});

// 删除文章
router.delete('/articles/:id', adminOnly, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM article WHERE article_id = ?', [id]);

        res.json({
            code: 200,
            success: true,
            message: '删除成功'
        });
    } catch (error) {
        console.error('删除文章错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '删除文章失败'
        });
    }
});

// ============================================
// 分类管理
// ============================================

// 获取分类列表
router.get('/categories', adminOnly, async (req, res) => {
    try {
        const sql = 'SELECT c.*, u.username as creator_name, COUNT(a.article_id) as article_count\n' +
                    'FROM article_category c\n' +
                    'LEFT JOIN user u ON c.user_id = u.id\n' +
                    'LEFT JOIN article a ON c.category_id = a.category_id\n' +
                    'GROUP BY c.category_id\n' +
                    'ORDER BY c.created_at DESC';
        const [rows] = await pool.query(sql);

        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: rows
        });
    } catch (error) {
        console.error('获取分类列表错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '获取分类列表失败'
        });
    }
});

// 添加分类
router.post('/categories', adminOnly, async (req, res) => {
    const { category_name, category_desc = '' } = req.body;
    const user_id = req.user.id;

    if (!category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '分类名称不能为空'
        });
    }

    try {
        const category_id = Date.now();
        const sql = 'INSERT INTO article_category (category_id, category_name, category_desc, user_id) VALUES (?, ?, ?, ?)';
        await pool.query(sql, [category_id, category_name, category_desc, user_id]);

        res.json({
            code: 200,
            success: true,
            message: '添加成功',
            data: { category_id }
        });
    } catch (error) {
        console.error('添加分类错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '添加分类失败'
        });
    }
});

// 更新分类
router.put('/categories/:id', adminOnly, async (req, res) => {
    const { id } = req.params;
    const { category_name, category_desc } = req.body;

    if (!category_name) {
        return res.status(400).json({
            code: 400,
            success: false,
            message: '分类名称不能为空'
        });
    }

    try {
        const sql = 'UPDATE article_category SET category_name = ?, category_desc = ? WHERE category_id = ?';
        await pool.query(sql, [category_name, category_desc, id]);

        res.json({
            code: 200,
            success: true,
            message: '更新成功'
        });
    } catch (error) {
        console.error('更新分类错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '更新分类失败'
        });
    }
});

// 删除分类
router.delete('/categories/:id', adminOnly, async (req, res) => {
    const { id } = req.params;

    try {
        // 检查是否有文章使用此分类
        const [articles] = await pool.query('SELECT COUNT(*) as count FROM article WHERE category_id = ?', [id]);
        if (articles[0].count > 0) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: '该分类下有文章，无法删除'
            });
        }

        await pool.query('DELETE FROM article_category WHERE category_id = ?', [id]);

        res.json({
            code: 200,
            success: true,
            message: '删除成功'
        });
    } catch (error) {
        console.error('删除分类错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '删除分类失败'
        });
    }
});

// ============================================
// 数据统计
// ============================================

router.get('/stats', adminOnly, async (req, res) => {
    try {
        // 用户统计
        const [userStats] = await pool.query(`
            SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as inactive
            FROM user
        `);

        // 文章统计
        const [articleStats] = await pool.query(`
            SELECT
                COUNT(*) as total,
                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as published,
                SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as draft
            FROM article
        `);

        // 分类统计
        const [categoryStats] = await pool.query('SELECT COUNT(*) as total FROM article_category');

        // 近 7 天文章增长
        const [weeklyArticleGrowth] = await pool.query(`
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM article
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date
        `);

        // 近 7 天用户增长
        const [weeklyUserGrowth] = await pool.query(`
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM user
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date
        `);

        res.json({
            code: 200,
            success: true,
            message: '获取成功',
            data: {
                users: userStats[0],
                articles: articleStats[0],
                categories: categoryStats[0],
                weeklyArticleGrowth,
                weeklyUserGrowth
            }
        });
    } catch (error) {
        console.error('获取统计数据错误:', error);
        res.status(500).json({
            code: 500,
            success: false,
            message: '获取统计数据失败'
        });
    }
});

module.exports = router;
```

### 2. 修改 server.js 注册后台路由

**文件**: `server.js`

```javascript
// 在现有路由后添加
app.use(require('./routes/admin_request'));
```

---

## 四、前端实现方案（Vue 3 + Element Plus）

### 1. 项目结构

```
admin/
├── src/
│   ├── api/
│   │   ├── admin.js      # 管理员 API
│   │   └── stats.js      # 统计 API
│   ├── views/
│   │   ├── Dashboard.vue # 仪表盘
│   │   ├── UserList.vue  # 用户管理
│   │   ├── ArticleList.vue # 文章管理
│   │   ├── CategoryList.vue # 分类管理
│   │   └── Login.vue     # 管理员登录
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

### 2. 核心页面实现

#### Dashboard.vue - 仪表盘

```vue
<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon user"><i class="el-icon-user"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.users.total }}</div>
              <div class="stat-label">用户总数</div>
              <div class="stat-detail">
                <span class="active">活跃: {{ stats.users.active }}</span>
                <span class="inactive">禁用: {{ stats.users.inactive }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon article"><i class="el-icon-document"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.articles.total }}</div>
              <div class="stat-label">文章总数</div>
              <div class="stat-detail">
                <span class="active">已发布: {{ stats.articles.published }}</span>
                <span class="inactive">草稿: {{ stats.articles.draft }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon category"><i class="el-icon-folder"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.categories.total }}</div>
              <div class="stat-label">分类总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card header="近7天文章增长">
          <div ref="articleChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="近7天用户增长">
          <div ref="userChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { getStats } from '@/api/stats';

const stats = ref({
  users: { total: 0, active: 0, inactive: 0 },
  articles: { total: 0, published: 0, draft: 0 },
  categories: { total: 0 },
  weeklyArticleGrowth: [],
  weeklyUserGrowth: []
});

const articleChart = ref(null);
const userChart = ref(null);

onMounted(async () => {
  const { data } = await getStats();
  stats.value = data;

  // 渲染图表
  renderArticleChart();
  renderUserChart();
});

const renderArticleChart = () => {
  const chart = echarts.init(articleChart.value);
  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: stats.value.weeklyArticleGrowth.map(item => item.date)
    },
    yAxis: { type: 'value' },
    series: [{
      data: stats.value.weeklyArticleGrowth.map(item => item.count),
      type: 'line',
      areaStyle: {},
      smooth: true
    }]
  });
};

const renderUserChart = () => {
  const chart = echarts.init(userChart.value);
  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: stats.value.weeklyUserGrowth.map(item => item.date)
    },
    yAxis: { type: 'value' },
    series: [{
      data: stats.value.weeklyUserGrowth.map(item => item.count),
      type: 'bar',
      smooth: true
    }]
  });
};
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  margin-right: 15px;
}

.stat-icon.user { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.article { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-icon.category { background: linear-gradient(135deg, #4facfe, #00f2fe); }

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.stat-label {
  color: #909399;
  font-size: 14px;
}

.stat-detail {
  margin-top: 5px;
  font-size: 12px;
}

.stat-detail .active { color: #67c23a; margin-right: 10px; }
.stat-detail .inactive { color: #909399; }
</style>
```

#### UserList.vue - 用户管理

```vue
<template>
  <div class="user-list">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="keyword"
          placeholder="搜索用户名或邮箱"
          style="width: 200px;"
          @change="fetchUsers"
        />
        <el-select v-model="status" placeholder="用户状态" style="width: 120px;" @change="fetchUsers">
          <el-option label="全部" value="" />
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
        <el-button type="primary" @click="fetchUsers">搜索</el-button>
      </div>

      <el-table :data="users" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role_name" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role_id === 1 ? 'danger' : 'primary'">
              {{ row.role_name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="openEditDialog(row)">编辑</el-button>
            <el-button size="small" type="warning" @click="openResetPasswordDialog(row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        @size-change="fetchUsers"
        @current-change="fetchUsers"
      />
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑用户" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role_id">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">保存</el-button>
      </template>
    </el-dialog>

    <!-- 重置密码对话框 -->
    <el-dialog v-model="resetPasswordDialogVisible" title="重置密码" width="400px">
      <el-form :model="resetPasswordForm" label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="resetPasswordForm.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetPasswordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleResetPassword">确认重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUsers, updateUser, updateUserStatus, resetUserPassword } from '@/api/admin';

const users = ref([]);
const keyword = ref('');
const status = ref('');
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const editDialogVisible = ref(false);
const editForm = ref({ id: '', username: '', email: '', role_id: 2 });

const resetPasswordDialogVisible = ref(false);
const resetPasswordForm = ref({ id: '', password: '' });

const fetchUsers = async () => {
  const { data } = await getUsers({
    page: page.value,
    page_size: pageSize.value,
    keyword: keyword.value,
    status: status.value
  });
  users.value = data.list;
  total.value = data.total;
};

const openEditDialog = (row) => {
  editForm.value = { ...row };
  editDialogVisible.value = true;
};

const handleEdit = async () => {
  await updateUser(editForm.value.id, editForm.value);
  ElMessage.success('更新成功');
  editDialogVisible.value = false;
  fetchUsers();
};

const handleStatusChange = async (row) => {
  await updateUserStatus(row.id, { status: row.status });
  ElMessage.success(row.status === 1 ? '用户已启用' : '用户已禁用');
};

const openResetPasswordDialog = (row) => {
  resetPasswordForm.value = { id: row.id, password: '' };
  resetPasswordDialogVisible.value = true;
};

const handleResetPassword = async () => {
  if (resetPasswordForm.value.password.length < 6) {
    ElMessage.warning('密码长度不能少于6位');
    return;
  }
  await resetUserPassword(resetPasswordForm.value.id, { password: resetPasswordForm.value.password });
  ElMessage.success('密码重置成功');
  resetPasswordDialogVisible.value = false;
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.toolbar {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}
</style>
```

### 3. API 调用

**文件**: `src/api/admin.js`

```javascript
import request from './request';

export const getUsers = (params) => {
    return request.get('/admin/users', { params });
};

export const updateUser = (id, data) => {
    return request.put(`/admin/users/${id}`, data);
};

export const updateUserStatus = (id, data) => {
    return request.put(`/admin/users/${id}/status`, data);
};

export const resetUserPassword = (id, data) => {
    return request.post(`/admin/users/${id}/password`, data);
};

export const getArticles = (params) => {
    return request.get('/admin/articles', { params });
};

export const deleteArticle = (id) => {
    return request.delete(`/admin/articles/${id}`);
};

export const getCategories = () => {
    return request.get('/admin/categories');
};

export const addCategory = (data) => {
    return request.post('/admin/categories', data);
};

export const updateCategory = (id, data) => {
    return request.put(`/admin/categories/${id}`, data);
};

export const deleteCategory = (id) => {
    return request.delete(`/admin/categories/${id}`);
};
```

---

## 五、数据库扩展

### 添加用户状态字段

```sql
ALTER TABLE user ADD COLUMN status TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用';

ALTER TABLE article_category ADD COLUMN category_desc VARCHAR(255) DEFAULT '' COMMENT '分类描述';
```

---

## 六、权限控制增强

### 添加权限表

```sql
CREATE TABLE permission (
    permission_id INT PRIMARY KEY AUTO_INCREMENT,
    permission_name VARCHAR(50) NOT NULL UNIQUE,
    permission_key VARCHAR(50) NOT NULL UNIQUE,
    permission_desc VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO permission (permission_name, permission_key, permission_desc) VALUES
('用户管理', 'user:manage', '查看、编辑、禁用用户'),
('文章管理', 'article:manage', '查看、编辑、删除文章'),
('分类管理', 'category:manage', '管理文章分类'),
('系统设置', 'system:settings', '修改系统配置');
```

---

## 七、总结

通过以上实现，你将获得：

| 模块 | 功能 | 状态 |
|------|------|------|
| 后台路由 | 完整的管理员 API | ✅ |
| 用户管理 | 列表、搜索、编辑、禁用、重置密码 | ✅ |
| 文章管理 | 列表、搜索、删除 | ✅ |
| 分类管理 | CRUD 操作 | ✅ |
| 数据统计 | 用户/文章/分类统计 + 图表 | ✅ |
| 前端示例 | Vue 3 + Element Plus | ✅ |
| 权限控制 | 管理员中间件 + 细粒度权限 | ✅ |

这套后台管理系统可以作为你项目的完整参考实现。
