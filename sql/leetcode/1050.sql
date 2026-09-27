-- @difficulty easy
-- @tags 计数
-- @note 按演员和导演分组，筛出现次数不少于 3
select actor_id,director_id
from ActorDirector
group by actor_id,director_id
having count(timestamp)>=3