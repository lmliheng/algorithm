/**
 * @前n项和 可以快速求解两个索引之间元素之和On=>O1
 * @作用是加快算法效率
 */

let a = [1, 4, 6, 8, 9]

let sum = []

/**
 * 求前缀和
 */
let sum1 = 0
for (let i = 0; i < a.length; i++) {
    sum1 += a[i]
    sum.push(sum1)
}
console.log(sum)


/**
 * 扩展到二维数组.....
 */