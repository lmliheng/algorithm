/**
 * @完全平方数
 * 
 * 和零钱兑换一个解法
 */

function numSquares(n) {
    let dp = Array.from({ length: n + 1 }, () => Infinity)
    if(n==1){return 1}
    if(n==2){return 2}
    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        for (let j = 0; j <= i / j; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
        }
    }
    console.log(dp)
    // return dp[n]==Infinity?n:dp[n]
    return dp[n]
};