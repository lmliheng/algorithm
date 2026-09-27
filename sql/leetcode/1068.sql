-- @difficulty easy
-- @tags 哈希表
-- @note 按 product_id 连接两张表取名称和年份
select p.product_name,s.year,s.price
from Sales as s
join product as p
on s.product_id=p.product_id