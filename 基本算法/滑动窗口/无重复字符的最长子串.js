/**
 * @无重复字符的最长子串
 * 力扣第三题，用滑动窗口做
 * 母题：2958最多K个重复元素的最长子数组
 */
export function lengthOfLongestSubstring(s) {
    let res = 0
    let map = new Map()
    let left = 0
    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], 1)
        } else {
            map.set(s[i], map.get(s[i]) + 1)
        }

        while (map.get(s[i]) > 1) {
            map.set(s[left], map.get(s[left]) - 1)
            left++
        }
        res = Math.max(res, i - left + 1)

    }
    return res
};