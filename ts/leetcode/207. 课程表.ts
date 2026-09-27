/**
 * @difficulty medium
 * @tags 图,拓扑排序
 * @time O(n+m)
 * @space O(n+m)
 * @note 只统计无先修课的课程，拓扑排序未写完
 * @207. 课程表
 */
let numCourses = 2
let prerequisites = [[1, 0]]

let set = new Set()
let map = new Map(prerequisites)
let set_pre=new Set([...map.values()])
let set_need = new Set([...map.keys()])
console.log(set_pre,set_need)

// 先修无要求的课
for (let i = 0; i <numCourses; i++) {
    if (!set_need.has(i)) {
        set.add(i)
    }
}






console.log(set)
console.log([...set].length===numCourses)
