/**
 * @有多少小于当前数字的数字
 */
export function smallerNumbersThanCurrent(nums) {
    let n = nums.length
    let raw_nums = nums.map((item) => item)

    let map = new Map()
    nums.sort((a, b) => a - b)
    let same_count = 1
    let num_count = 0
    map.set(nums[0], 0)
    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] > nums[i - 1]) {
            map.set(nums[i], i)
        }
    }

    return raw_nums.map(item => map.get(item))
};