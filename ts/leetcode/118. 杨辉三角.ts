/**
 * @difficulty easy
 * @tags 数组,dp,模拟
 * @time O(n^2)
 * @space O(n^2)
 * @note 逐行递推，两端为 1 中间由上一行相加
 * @118. 杨辉三角
 */

let numRows = 5
let res: number[][] = []
for (let i = 0; i < numRows; i++) {
    if (i === 0) {
        res.push([1])
    }
    if (i === 1) {
        res.push([1, 1])
    }
    if (i > 1) {
        let arr = new Array(i + 1)
        arr[0] = 1
        arr[i] = 1
        for (let j = 1; j < i; j++) {
            arr[j] = res[i - 1][j - 1] + res[i - 1][j]
        }
        res.push(arr)


    }
}

console.log(res)
