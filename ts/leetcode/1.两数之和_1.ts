/**
 * @difficulty easy
 * @tags 双指针,数组
 * @time O(n)
 * @space O(1)
 * @note 这里的数组是一个有序数组，先假定是非递减的
 * 
 * @两数之和(改进1)
 * 时间复杂度O(n),空间复杂度O(1)
 */

function twoSum(nums: number[], target: number) {
    let n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = n - 1; j > i; j--) {
            if (nums[i] + nums[j] < target) {
                break
            } else if (nums[i] + nums[j] > target) {
                continue
            } else {
                return [i, j]
            }
        }
    }
}

