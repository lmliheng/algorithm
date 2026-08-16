/**
 * @和为K的子数组
 * 不能使用滑动窗口，滑动窗口需要满足单调性，当右端点元素进入窗口时，窗口元素和是不能减少的
 */
export function subarraySum(nums, k) {
    let res = 0
    let map = new Map()
    map.set(0, 1)// k=一个元素大小 算一个子数组
    let prefix_right = 0
    for (let i = 0; i < nums.length; i++) {
        prefix_right += nums[i]
        let prefix_left = prefix_right - k
        if (map.has(prefix_left)) {
            res += map.get(prefix_left)
        }

        if (!map.has(prefix_right)) {
            map.set(prefix_right, 1)
        } else {
            map.set(prefix_right, map.get(prefix_right) + 1)
        }

    }
    return res

};