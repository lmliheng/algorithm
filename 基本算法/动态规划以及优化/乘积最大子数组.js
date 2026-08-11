/**
 * @乘积最大子数组
 * 使用二维dp
 */

let nums = [2, 3, -2, 4]


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

