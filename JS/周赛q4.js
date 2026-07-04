let word1 = "abc"
let word2 = "bac"
let target = "abc"

let m = word1.length
let n = word2.length
let k = target.length

//s1有i个元素，s2有j个元素 组成s3
let dp = new Array(m + 1).fill(false).map(() => new Array(n + 1).fill(false))
console.log(dp)
//初始化
dp[0][0] = true
for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && word1[i - 1] === target[i - 1]
}
for (let i = 1; i <= n; i++) {
    dp[0][i] = dp[0][i - 1] && word2[i - 1] === target[i - 1]
}
for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
    }
}

console.log(dp)