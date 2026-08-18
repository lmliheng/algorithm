/**
 * @最长快乐前缀
 * 
 * 其实就是求 字符串的最长相同前后缀
 * 和next数组生成一样
 * 
 */
export function longestPrefix(s) {
    let n = s.length
    let i = 0
    let j = -1
    let next = []
    next[0] = -1
    while (i < n) {
        if (j === -1 || s[i] === s[j]) {
            i++
            j++
            next[i] = j
        } else {
            j = next[j]
        }
    }
    return s.substring(0, next[n])
};