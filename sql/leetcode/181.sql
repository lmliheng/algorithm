-- @difficulty easy
-- @tags 哈希表
-- @note 自连接员工表，找出工资高于经理的人
select a.name as Employee
from Employee as a,Employee as b
where a.managerId=b.id and a.salary>b.salary