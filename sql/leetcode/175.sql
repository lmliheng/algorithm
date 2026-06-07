-- Write your PostgreSQL query statement below

select Person.firstName, Person.lastName, Address.city, Address.state
from Person
join Address on Address.personId=Person.personId


-- | firstname | lastname | city          | state    |
-- | --------- | -------- | ------------- | -------- |
-- | Bob       | Alice    | New York City | New York |


select Person.firstName, Person.lastName, Address.city, Address.state
from Person
left join Address on Address.personId=Person.personId