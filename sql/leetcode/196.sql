-- @difficulty easy
-- @tags 计数
-- @note 自连接删除同邮箱中 id 较大的重复行
delete from Person a
using Person b 
where a.id>b.id and a.email=b.email