/**
 * @跳跃游戏2
 * 
 */



/**
 * 
 * @不推荐使用dp
 * 时间开销非常大
 */
function jump(nums) {
    let n = nums.length
    let dp = new Array(n).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] !== -1 && nums[j] >= (i - j)) {
                dp[i] = Math.min(dp[i], dp[j] + 1)
            }
        }
    }
    return dp[n - 1]
};