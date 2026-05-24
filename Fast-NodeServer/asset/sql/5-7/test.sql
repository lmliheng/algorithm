-- Active: 1773072033347@@127.0.0.1@3306@fastweb_test

-- 默认角色为2 普通用户
ALTER TABLE `user`
CHANGE `role` `role` bigint unsigned UNSIGNED DEFAULT 2;
---- 增加了头像字段----
ALTER TABLE `user`
ADD COLUMN `avatar` varchar(255) DEFAULT NULL COMMENT '头像' AFTER `email`;


ALTER TABLE `article`
ADD COLUMN `status` BOOLEAN DEFAULT 0 COMMENT '状态：0-草稿，1-已发布，2-仅自己可见' AFTER `content`;

----
ALTER TABLE `user`
CHANGE `role` `role_id` bigint unsigned UNSIGNED DEFAULT 2 COMMENT '角色ID';

ALTER TABLE `article_category`
CHANGE `cartcategory_id` `cartgory_id` bigint unsigned UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章分类ID';

-- 根据用户id查询权限列表--
SELECT p.*
FROM
    user u
    JOIN role r ON u.role_id = r.role_id
    JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
    JOIN permission p ON p.permission_id = rp.permission_id
WHERE
    u.id = 3;

-- 更换用户角色--
UPDATE user SET role_id = 3 WHERE id = 3;

-- 分页查询用户文章列表，并关联文章分类
-- 查询结果是join后的结果--
SELECT a.article_id, a.title, a.content, c.category_id, c.category_name, a.created_at, a.updated_at
FROM
    article a
    JOIN articleandcategory_middle ac ON a.article_id = ac.article_id
    JOIN article_category c ON c.category_id = ac.category_id
WHERE
    a.user = 1
ORDER BY a.created_at DESC
LIMIT 10
OFFSET
    0


    SELECT COUNT(*) as total
        FROM article a
        WHERE a.user =1



