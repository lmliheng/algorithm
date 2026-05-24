
--login 验证密码 根据用户名取密码--
SELECT password FROM user WHERE username = 'admin';

--注册，三个必要字段。不使用邮箱登录就在接口处自定义默认值--
INSERT INTO user (username, password, email)
VALUES ('user1', '123456', 'user1@example.com');

-- 重置密码--
UPDATE user
SET password = '123456'
WHERE id = 3;


--查询用户信息根据id 用户名，邮箱，id，头像，创建时间，角色名，角色id，权限列表，是一个9*n的表格--
SELECT u.username, u.email, u.id, u.avatar, u.created_at, r.role_name, r.role_id, p.permission_name, p.permission_id
FROM user u
    JOIN role r ON u.role_id = r.role_id
    JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
    JOIN permission p ON p.permission_id = rp.permission_id
WHERE
    u.id = 3;


-- 更换用户信息  通过param传递id还有要修改的字段，对应到user表的字段名，用数组维护，动态生成sql语句--
UPDATE user
SET email = 'user2@example.com'
WHERE id = 3;


--更换用户角色 ，后端接口鉴权--
UPDATE user
SET role_id = 3
WHERE id = 3;


-- 根据用户id查询权限列表--
SELECT p.*
FROM user u
    JOIN role r ON u.role_id = r.role_id
    JOIN roleandpermission_middle rp ON rp.role_id = r.role_id
    JOIN permission p ON p.permission_id = rp.permission_id
WHERE
    u.id = 3;


--增加/删除用户权限  动态生成sql语句--
INSERT INTO roleandpermission_middle (role_id, permission_id)
VALUES (3, 1);



--增加/删除权限  动态生成sql语句--
insert into permission (permission_name)
values ('user_read');
