/**
 * @difficulty medium
 * @tags 数组,双指针,排序
 * @time O(n^2)
 * @space O(1)
 * @note 排序后固定一个数，双指针向 target 逼近
 * @16. 最接近的三数之和
 */

var threeSumClosest = function (nums: number[], target: number) {
    nums = nums.sort((a, b) => a - b)
    // 优化
    if (nums[0] + nums[1] + nums[2] >= target) {
        return nums[0] + nums[1] + nums[2]
    }

    if (nums[nums.length - 3] + nums[nums.length - 2] + nums[nums.length - 1] <= target) {
        return nums[nums.length - 3] + nums[nums.length - 2] + nums[nums.length - 1]
    }


    let near = 100000
    let res = nums[1] + nums[2] + nums[0]


    for (let i = 0; i < nums.length - 2; i++) {

        let j = i + 1
        let k = nums.length - 1

        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k]
            if (target === sum) {
                return target
            }

            if (near > Math.abs(target - sum)) {
                near = Math.abs(target - sum)
                res = sum
            }

            if (sum > target) {
                k--
            } else {
                j++
            }

        }

    }
    return res
};