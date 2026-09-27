/**
 * @difficulty easy
 * @tags 数组,矩阵,模拟
 * @time O(m*n)
 * @space O(m*n)
 * @note 按下标 i*n+j 逐行填入二维数组
 * @2022. 将一维数组转变成二维数组
 */

let original: number[] = [1, 2, 3, 4]
let m: number = 4
let n: number = 1
if (!(original.length === m * n)) { return [] }
let res: number[][] = new Array(m)
for (let i: number = 0; i < m; i++) {
    res[i] = new Array(n)
    for (let j: number = 0; j < n; j++) {
        console.log(original[i*n+j])
        res[i][j]=original[i*n+j]
    }
}

console.log(res)

export {};
