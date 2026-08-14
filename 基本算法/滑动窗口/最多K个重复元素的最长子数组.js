/**
 * @最多K个重复元素的最长子数组
 */


/**
 * @滑动窗口
 * 很简单的滑动窗口题目，
 * 配合map检查所有符合条件的子数组 得到res
 */
export function maxSubarrayLength(nums, k) {
    let res = 0
    let left = 0
    let map = new Map()
    for (let right = 0; right < nums.length; right++) {
        if (!map.has(nums[right])) {
            map.set(nums[right], 1)
        } else {
            map.set(nums[right], map.get(nums[right]) + 1)
        }
        while (map.get(nums[right]) > k) {
            map.set(nums[left], map.get(nums[left]) - 1)
            left++
        }
        res = Math.max(res, right - left + 1)
    }
    return res
};