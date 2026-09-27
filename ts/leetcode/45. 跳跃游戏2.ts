/**
 * @difficulty medium
 * @tags dp,贪心,数组
 * @time O(n^2)
 * @space O(n)
 * @note 只写了 dp 版，贪心解留空未写
 * @45. 跳跃游戏 II
 */

/**
 * 
 * @不推荐使用dp
 * 时间开销非常大
 */
function jump(nums: number[]) {
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

/**
 * @贪心
 */