/**
 * @通配符匹配
 * 
 */

let s = "cb"
let p = "*"

let s_len = s.length
let p_len = p.length
// dp[i][j]表示s的前i-1个字符和p的前j-1个字符匹配,dp[-1][-1]就是都是空的时候
let dp = new Array(s_len + 1).fill(false).map(() => new Array(p_len + 1).fill(false))
for (let i = 1; i <= p_len; i++) {
    if (p[i - 1] === '*') {
        dp[0][i] = true
    } else {
        break
    }
}
for (let i = 1; i < s_len; i++) {
    for (let j = 1; j < p_len; j++) {
        if (p[j - 1] === '*') {
            dp[i][j] = dp[i][j - 1] && dp[i - 1][j]
        } else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
            dp[i][j] = dp[i - 1][j - 1]
        }
    }
}

console.log(dp)
console.log(dp.flat(3).indexOf(true))