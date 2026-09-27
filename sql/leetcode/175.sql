-- Write your PostgreSQL query statement below
-- @difficulty easy
-- @tags 哈希表
-- @note 左连接地址表，保证没有地址的人也保留

select Person.firstName, Person.lastName, Address.city, Address.state
from Person
join Address on Address.personId=Person.personId


-- | firstname | lastname | city          | state    |
-- | --------- | -------- | ------------- | -------- |
-- | Bob       | Alice    | New York City | New York |


select Person.firstName, Person.lastName, Address.city, Address.state
from Person
left join Address on Address.personId=Person.personId