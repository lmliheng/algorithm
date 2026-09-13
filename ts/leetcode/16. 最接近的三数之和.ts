/**
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