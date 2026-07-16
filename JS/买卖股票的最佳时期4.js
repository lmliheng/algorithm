/**
 * @买卖股票的最佳时期4
 * dp
 */

let k = 2
let prices = [3, 2, 6, 5, 0, 3]

let n = prices.length
k = Math.min(k, Math.floor(n / 2))

//dp[i][j][k]代表 第i天交易了k次时的最大利润，其中j代表当天是否持有股票，0不持有，1持有
let dp = Array.from({ length: n }, () =>
    Array.from({ length: 2 }, () =>
        Array(k + 1).fill(-Infinity)
    )
)

// 第0天
for (let t = 0; t <= k; t++) {
    dp[0][0][t] = 0
    dp[0][1][t] = -prices[0]
}

for (let i = 1; i < n; i++) {
    for (let t = 0; t <= k; t++) {
        dp[i][0][t] = Math.max(dp[i - 1][0][t], t > 0 ? dp[i - 1][1][t - 1] + prices[i] : -Infinity)
        dp[i][1][t] = Math.max(dp[i - 1][1][t], dp[i - 1][0][t] - prices[i])
    }
}

console.log(dp)
console.log(Math.max(...dp[n-1][0],...dp[n-1][1]))