-- Active: 1773072033347@@127.0.0.1@3306@fastweb_test
-- 数据插入脚本
-- 插入顺序必须遵循外键依赖关系

-- 1. 插入角色数据
INSERT INTO `role` (`role_name`) VALUES
('超级管理员'),
('普通用户'),
('编辑');

-- 2. 插入权限数据
INSERT INTO `permission` (`permission_name`, `permission_description`) VALUES
('user:create', '创建用户'),
('user:read', '查看用户'),
('user:update', '更新用户'),
('user:delete', '删除用户'),
('article:create', '创建文章'),
('article:read', '查看文章'),
('article:update', '更新文章'),
('article:delete', '删除文章'),
('category:create', '创建分类'),
('category:read', '查看分类'),
('category:update', '更新分类'),
('category:delete', '删除分类');

-- 3. 插入用户数据
-- 密码都是 123456 的 bcrypt 加密值
INSERT INTO `user` (`username`, `email`, `password`, `role_id`) VALUES
('admin', 'admin@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),
('editor', 'editor@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 3),
('user1', 'user1@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2),
('user2', 'user2@test.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2);

-- 4. 插入文章分类数据
INSERT INTO `article_category` (`category_name`, `user`) VALUES
('技术博客', 1),
('生活随笔', 1),
('项目案例', 2),
('学习笔记', 3);

-- 5. 插入文章数据
INSERT INTO `article` (`title`, `content`, `user`) VALUES
('Node.js 快速入门', 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境...', 1),
('MySQL 数据库设计', '好的数据库设计是应用成功的基础...', 2),
('我的 2026 年展望', '新的一年，新的开始...', 3),
('Express 框架最佳实践', 'Express 是 Node.js 最流行的 Web 框架之一...', 1),
('如何学习编程', '学习编程需要耐心和实践...', 4);

-- 6. 插入文章分类关联数据
INSERT INTO `articleAndcategroy_middle` (`article_id`, `category_id`) VALUES
(1, 1),
(1, 4),
(2, 1),
(3, 2),
(4, 1),
(4, 4),
(5, 2),
(5, 4);

-- 7. 插入角色权限关联数据
-- 超级管理员拥有所有权限
INSERT INTO `roleAndPermission_middle` (`role_id`, `permission_id`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(1, 5), (1, 6), (1, 7), (1, 8),
(1, 9), (1, 10), (1, 11), (1, 12);

-- 编辑拥有文章和分类的所有权限
INSERT INTO `roleAndPermission_middle` (`role_id`, `permission_id`) VALUES
(3, 2), (3, 5), (3, 6), (3, 7), (3, 8),
(3, 9), (3, 10), (3, 11), (3, 12);

-- 普通用户只有查看权限
INSERT INTO `roleAndPermission_middle` (`role_id`, `permission_id`) VALUES
(2, 2), (2, 6), (2, 10);
