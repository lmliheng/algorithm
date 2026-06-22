let n = 50
// dp 二维数组，第二层数组4位，0表示全空，1表示全满，3表示上部分有一个，4下部分有一个
let dp = new Array(n).fill(0).map(item => new Array(4).fill(0))
let mod = 1000000007
// 初始化
dp[0][0] = 1
dp[0][1] = 1
for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][1] % mod
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3]) % mod
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][3]) % mod
    dp[i][3] = (dp[i - 1][0] + dp[i - 1][2]) % mod

}
console.log(dp[n - 1][1])