-- Active: 1773072033347@@127.0.0.1@3306@fastweb_test
-- 重新组织表创建顺序：被引用的表必须先创建

-- 1. 首先创建没有外键依赖的基础表
CREATE TABLE IF NOT EXISTS `role` (
    `role_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(255) NOT NULL UNIQUE DEFAULT '普通用户' COMMENT '角色名',
    PRIMARY KEY (`role_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '角色';

CREATE TABLE IF NOT EXISTS `permission` (
    `permission_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `permission_name` VARCHAR(255) NOT NULL UNIQUE COMMENT '权限名',
    `permission_description` VARCHAR(255) DEFAULT '权限未定义描述值' COMMENT '权限描述',
    PRIMARY KEY (`permission_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 2. 创建依赖role表的user表
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    `email` VARCHAR(100) UNIQUE DEFAULT 'liheng@test' COMMENT '邮箱',
    `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
    `password` VARCHAR(255) NOT NULL COMMENT '密码(加密存储)',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `role_id` BIGINT UNSIGNED DEFAULT 2 COMMENT '角色ID',
    PRIMARY KEY (`id`),
    INDEX `idx_role` (`role_id`),
    CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '用户表';

-- 3. 创建依赖user表的article和article_category表

CREATE TABLE IF NOT EXISTS `article` (
    `article_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章ID',
    `title` VARCHAR(255) NOT NULL COMMENT '文章标题',
    `content` LONGTEXT COMMENT '文章内容',
    `user` BIGINT UNSIGNED NOT NULL COMMENT '创建用户ID',
    `status` BOOLEAN DEFAULT 0 COMMENT '状态：0-草稿，1-已发布，2-仅自己可见',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`article_id`),
    INDEX `idx_user` (`user`),
    CONSTRAINT `fk_article_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '文章表';

CREATE TABLE IF NOT EXISTS `article_category` (
    `category_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章分类ID',
    `category_name` VARCHAR(100) NOT NULL COMMENT '文章分类名称',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `user` BIGINT UNSIGNED DEFAULT NULL COMMENT '创建用户ID',
    PRIMARY KEY (`category_id`),
    INDEX `idx_user` (`user`),
    CONSTRAINT `fk_article_category_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '文章分类表';

-- 4. 创建中间表（依赖article和article_category）
DROP TABLE IF EXISTS `articleAndcategroy_middle`;

CREATE TABLE IF NOT EXISTS `articleAndcategroy_middle` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `article_id` BIGINT UNSIGNED NOT NULL COMMENT '文章id',
    `category_id` BIGINT UNSIGNED NOT NULL COMMENT '分类id',
    PRIMARY KEY (`id`),
    INDEX `idx_article_id` (`article_id`),
    INDEX `idx_category_id` (`category_id`),
    CONSTRAINT `fk_middle_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_middle_category` FOREIGN KEY (`category_id`) REFERENCES `article_category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '中间表';

-- 5. 创建角色权限中间表（依赖role和permission）
DROP TABLE IF EXISTS `roleAndPermission_middle`;

CREATE TABLE IF NOT EXISTS `roleAndPermission_middle` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `permission_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `idx_role_id` (`role_id`),
    INDEX `idx_permission_id` (`permission_id`),
    CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;