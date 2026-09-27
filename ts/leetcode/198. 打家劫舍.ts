/**
 * @difficulty medium
 * @tags dp,数组
 * @time O(n^2)
 * @space O(n)
 * @note dp[i] 取前 i-1 项最大值再加当前值
 * @198. 打家劫舍
 */

let nums = [1, 2, 3, 1]

let dp = new Array(nums.length).fill(0)

dp[0] = nums[0]
dp[1] = Math.max(nums[0], nums[1])
for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(...dp.slice(0, i - 1)) + nums[i]

}
console.log(dp)
