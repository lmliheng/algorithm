/**
 * @按位异或非零的最长子序列
 * 按位异或操作
 * 
 * 数组中元素按位异或为0的情况，1.整个数组全是0 2.最后一个数和其他数按位异或值相同
 * 
 * 这题是一个脑筋急转弯
 */
export function longestSubsequence(nums) {
    let n = nums.length
    let res = nums[0]
    let allzero = true

    if (nums[0] > 0) {
        allzero = false
    }

    for (let i = 1; i < n; i++) {
        res ^= nums[i]
        if (nums[i] > 0) {
            allzero = false
        }

    }
    if (res > 0) {
        return n
    }

    return allzero ? 0 : n - 1

};