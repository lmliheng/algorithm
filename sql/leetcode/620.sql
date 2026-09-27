-- @difficulty easy
-- @tags 排序,数学
-- @note 取奇数 id 且描述不无聊的电影，按评分降序
select id,movie,description,rating
from cinema
where id%2=1 and description!='boring'
order by rating desc