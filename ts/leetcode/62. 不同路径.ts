/**
 * @difficulty medium
 * @tags dp,矩阵
 * @time O(m*n)
 * @space O(m*n)
 * @note dp为上格加左格，首行首列全为1
 * @62. 不同路径
 */

let m = 3
let n = 7

let dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0))

// 初始化
dp[0][0] = 1;
for (let i = 1; i < n; i++) {
    dp[0][i] = 1;
}
for (let i = 1; i < m; i++) {
    dp[i][0] = 1;
}

for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
        console.log(i, j)
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
}

console.log(dp)
console.log(dp[m - 1][n - 1])
