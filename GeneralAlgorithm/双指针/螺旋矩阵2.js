
/**
 * @螺旋矩阵2
 * 使用四个指针标定上下左右边界
 */
let n = 5

if (n === 1) {
    return [[1]]
}
if (n === 2) {
    return [[1, 2], [4, 3]]
}
let l = 0
let r = n - 1
let t = 0
let b = n - 1
let res = new Array(n).fill(1).map(() => new Array(n).fill(1))
let nums = n * n
let num = 1
while (num <= nums) {
    for (let i = l; i <= r; i++) {
        res[t][i] = num
        num++
    }
    t++
    for (let i = t; i <= b; i++) {
        res[i][r] = num
        num++
    }
    r--
    for (let i = r; i >= l; i--) {
        res[b][i] = num
        num++
    }
    b--
    for (let i = b; i >= t; i--) {
        res[i][l] = num
        num++
    }
    l++
}
console.log(res)