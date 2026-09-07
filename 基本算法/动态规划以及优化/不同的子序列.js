/**
 * @不同的子序列
 * 动态规划
 * 
 */

export function numDistinct(s, t) {
    let n = t.length
    // dp[i]表示t.slice(0,i)在s中的数量
    let dp = new Array(n + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < s.length; i++) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] === t[j]) {
                dp[j + 1] += dp[j]
            }
        }
    }
    console.log(dp)
    return dp[n]
};