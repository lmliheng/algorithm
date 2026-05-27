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
