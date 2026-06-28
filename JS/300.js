// dp dp[i]表示以i结尾的最长递增子序列的长度
let nums = [10, 9, 2, 5, 3, 7, 101, 18]
let res = 0
let dp = new Array(nums.length).fill(1)
for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1)
        }
    }
    res = Math.max(res, dp[i])
}
console.log(dp)
console.log(res)