/**
 * @乘积最大子数组
 * 使用二维dp
 * 
 * 没有用二维，多用一个dp数组记录最小值
 */


function maxProduct(nums) {
    let n = nums.length
    let dp = Array.from({ length: n }, () => undefined)
    let min = Array.from({ length: n }, () => undefined)
    dp[0] = min[0] = nums[0]
    for (let i = 1; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] * nums[i], min[i - 1] * nums[i])
        min[i] = Math.min(nums[i], dp[i - 1] * nums[i], min[i - 1] * nums[i])
    }
    console.log(dp, min)
    return Math.max(...dp)
};

/**
 * @暴力解法
 */
export function maxProduct1(nums) {
    let n = nums.length
    let res = -100000000
    for (let i = 0; i < n; i++) {
        let product = 1
        for (let j = i; j < n; j++) {
            product *= nums[j]
            res = Math.max(res, product)
        }
    }
    return res
};



/**
 * @动态规划
 */

