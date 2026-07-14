/**
 * @跳跃游戏4
 * dp
 */
let arr = [100, -23, -23, 404, 100, 23, 23, 23, 3, 404]
let n = arr.length
let dp = new Array(n).fill(Infinity)
dp[0] = 0
for (let i = 0; i < n; i++) {
    if (i - 1 >= 0) { dp[i - 1] = Math.min(dp[i] + 1, dp[i - 1]) }
    if (i + 1 < n) { dp[i + 1] = Math.min(dp[i] + 1, dp[i + 1]) }
    for (let j = i + 1; j < n; j++) {
        if (arr[j] === arr[i]) {
            dp[j] = Math.min(dp[j], dp[i] + 1)
        }
    }
    // 往前跳...
    // 往前跳的处理:。。。
    for (let j = 0; j < i; j++) {
        if (arr[j] === arr[i]) {
            dp[j] = Math.min(dp[j], dp[i] + 1)

        }
    }
}
console.log(dp)