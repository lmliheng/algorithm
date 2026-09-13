/**
 * @不同子序列115 -dp
 * 困难
 */
let s = "rabbbit"
let t = "rabbit"

let n = t.length
//dp表示
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
console.log(dp[n])