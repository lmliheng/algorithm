/**
 * @每个字符最多出现两次的最长子字符串
 * 是最多K个重复元素的最长子数组的子题
 */

export function maximumLengthSubstring(s) {
    let res = 0
    let map = new Map()
    let left = 0
    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], 1)
        } else {
            map.set(s[i], map.get(s[i]) + 1)
        }
        while (map.get(s[i]) > 2) {
            map.set(s[left], map.get(s[left]) - 1)
            left++
        }
        res = Math.max(res, i - left + 1)
    }

    return res
};