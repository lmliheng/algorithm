/***
 * @除了自身以外数组的乘积
 * lc 238
 * 
 * 化为nums的二维矩阵，
 * 左下对角线所有元素置1
 * 
 * res[1]=第一行所有元素乘积
 * res[2]=第二行所有元素乘积
 */
export function productExceptSelf(nums) {
    let n = nums.length
    let res = Array.from({ length: n }, () => 1)

    for (let i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1]
    }
    let temp = 1
    for (let i = n - 2; i >= 0; i--) {
        temp *= nums[i + 1]
        res[i] *= temp
    }
    return res

};