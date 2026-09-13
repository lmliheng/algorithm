/**
 * @螺旋矩阵
 */

let matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
let res = []
let m = matrix.length
let n = matrix[0].length
let t = 0
let r = n - 1
let b = m - 1
let l = 0
// let num = 0
// let nums = m * n
// while (num < nums) {
while (t <= b && l <= r) {
    for (let i = l; i <= r; i++) {
        res.push(matrix[t][i])
        // num++
    }
    t++

    for (let i = t; i <= b; i++) {
        res.push(matrix[i][r])
        // num++
    }
    r--
    if (t > b) break
    for (let i = r; i >= l; i--) {
        res.push(matrix[b][i])
        // num++
    }
    b--
    if (l > r) break
    for (let i = b; i >= t; i--) {
        res.push(matrix[i][l])
        // num++
    }
    l++

}
console.log(res)