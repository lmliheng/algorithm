let numCourses = 6
let prerequisites = [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]
const inDegree = new Array(numCourses).fill(0)
// 构建邻接表，使用对象存储 目标Number:依赖Array
const map = {}
for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++
    if (map[prerequisites[i][1]]) {
        // [[3, 0], [3, 1], [4, 1], [4, 2], [5, 3], [5, 4]]
        map[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
        map[prerequisites[i][1]] = [prerequisites[i][0]]
    }
}
console.log(map)
let quene = []
let res = []
// 入度为0的点
for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
        quene.push(i)
        res.push(i)
    }
}


while (quene.length) {
    let PreClass = quene.shift()
    let NextClass = map[PreClass]
    if (NextClass && NextClass.length) {
        for (let i = 0; i < NextClass.length; i++) {
            inDegree[NextClass[i]]-- // 入度减小1
            if (inDegree[NextClass[i]] === 0) {
                quene.push(NextClass[i])
                res.push(NextClass[i])
            }
        }
    }
}

console.log(res)