/**
 * @最长等差数列
 * 中等
 * @note难题
 */

let nums = [9, 4, 7, 2, 10]
// dp[i][d]表示以nums[i]结尾且公差为d的数列长度。
let n = nums.length
let dp = new Array(n).fill(1).map(() => new Array(1001).fill(1))
let res = 1
for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
        let d = nums[i] - nums[j] + 500
        dp[i][d] = dp[j][d] + 1
        res = Math.max(res, dp[i][d])
    }
}
return res