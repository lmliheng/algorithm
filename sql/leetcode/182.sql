-- @difficulty easy
-- @tags 计数,哈希表
-- @note 按邮箱分组，统计出现次数大于 1 的
select  Person.email as Email
from Person
group by Person.email
having count(*)>1