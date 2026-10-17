
import { UnionFind } from './union.js'
/**
 * @图的路径存在性查询
 * @超时了... 可以剪枝
 * 
 */
let n = 4, nums = [2, 5, 6, 8]
let maxDiff = 2
let queries = [[0, 1], [0, 2], [1, 3], [2, 3]]

let res = []
let len = queries.length
let uf = new UnionFind(n)

nums.sort((a, b) => a - b)

for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
        if (Math.abs(nums[i] - nums[j]) <= maxDiff) {
            uf.union(i, j)
        } else {
            break // break会跳出循环 还是直接废除该for循环
        }
    }
}
for (let i = 0; i < queries.length; i++) {
    if (uf.find(queries[i][0]) === uf.find(queries[i][1])) {
        res.push(true)
    } else {
        res.push(false)
    }
}

console.log(res)