-- Write your PostgreSQL query statement below
-- @difficulty easy
-- @tags 计数
-- @note 分组筛出只出现一次的数，再取最大值

select MAX(num) as num
from(
select num as num
from MyNumbers 
group by num
having count(num)=1
)

