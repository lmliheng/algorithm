/**
 * @difficulty medium
 * @tags dp,数组,子数组
 * @time O(n)
 * @space O(n)
 * @note dp为以i结尾的最大和，负数则重新开始
 * @53. 最大子数组和
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums: number[]) {
    let dp = new Array(nums.length + 1).fill(0)

    nums.forEach((item, index) => {

        if (dp[index] < 0) {
            dp[index + 1] = item
        } else {
            dp[index + 1] = item + dp[index]
        }
    }
    )
    // 避免dp的初始0
    return Math.max(...dp.slice(1))

};