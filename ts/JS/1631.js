/**
 * @dp
 * 
 * @lc1631最小体力消耗路径
 * @https://leetcode.cn/problems/path-with-minimum-effort/description/
 * 
 * @不能使用dp，路径没有规定只能左到右，上到下
 * 
 */

let heights = [[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]
let m = heights.length
let n = heights[0].length

let dp = new Array(m).fill(0).map(() => new Array(n).fill(Infinity))
// 初始化
dp[0][0] = 0
for (let i = 1; i < m; i++) {
    if (dp[i - 1][0] < Math.abs(heights[i][0] - heights[i - 1][0])) {
        dp[i][0] = Math.abs(heights[i][0] - heights[i - 1][0])
    } else {
        dp[i][0] = dp[i - 1][0]
    }
}

for (let i = 1; i < n; i++) {
    if (dp[0][i - 1] < Math.abs(heights[0][i] - heights[0][i - 1])) {
        dp[0][i] = Math.abs(heights[0][i] - heights[0][i - 1])
    } else {
        dp[0][i] = dp[0][i - 1]
    }
}

// 可以往回走
for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
        // 比一条路大 比另一条小
        // 比两条大
        let d1 = dp[i - 1][j] < Math.abs(heights[i][j] - heights[i - 1][j]) ? Math.abs(heights[i][j] - heights[i - 1][j]) : dp[i - 1][j]
        let d2 = dp[i][j - 1] < Math.abs(heights[i][j] - heights[i][j - 1]) ? Math.abs(heights[i][j] - heights[i][j - 1]) : dp[i][j - 1]
        let d3 = dp[i + 1][j] < Math.abs(heights[i][j] - heights[i][j - 1]) ? Math.abs(heights[i][j] - heights[i][j - 1]) : dp[i][j - 1]
        dp[i][j] = Math.min(d1, d2)
    }
}

console.log(dp)

