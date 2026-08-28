/**
 * @最长递增子序列
 * 
 * dp[i]表示以i结尾的最长递增子序列长度大小
 * 
 */

function lengthOfLIS(nums) {
    let n = nums.length
    let dp = Array.from({ length: n }, () => 1)
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    console.log(dp)
    return Math.max(...dp)
};