-- Write your PostgreSQL query statement below

select MAX(num) as num
from(
select num as num
from MyNumbers 
group by num
having count(num)=1
)

