/**
 * @
 * 滑动窗口
 * 
 */


/**
 * 
 * @始终维护一个无重复子串
 * 先确定右边界，再压缩左边界，直到右边界抵达n-1
 * 抵达res=xxx这段时，已经就是一个无重复子串
 * 
 */
function lengthOfLongestSubstring(s: string) {
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