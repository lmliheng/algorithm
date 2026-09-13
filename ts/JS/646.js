/**
 * 最长数对链
 */
let pairs = [[1, 2], [2, 3], [3, 4]]
let res = 0
let n = pairs.length
pairs.sort((a, b) => a[0] - b[0])
let dp = new Array(n).fill(1)
for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (pairs[i][0] > pairs[j][1]) {
            dp[i] = Math.max(dp[i], dp[j] + 1)
        }
    }
}

console.log(dp)