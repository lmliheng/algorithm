/**
 * @KMP
 */

let s = 'bbc abcdab abcdabcdabde'
let pattern = 'abcdabd'

/**
 * @生成子串的最长前后缀长度
 * 
 */
function generateArray(pattern) {
    let i = 0
    let j = -1
    let next = []
    next[0] = -1
    while (i < pattern.length) {
        if (j === -1 || pattern[i] === pattern[j]) {
            i++
            j++
            next[i] = j
        } else {
            j = next[j]
        }
    }
    return next
}

console.log(generateArray(pattern))

function kmp(s, pattern) {
    let next = generateArray(pattern)
    let i = 0
    let j = 0 // pattern上的指针
    while (i < s.length && j < pattern.length) {
        if (s[i] === pattern[j] || j === -1) {
            i++
            j++
        } else {
            j = next[j]
        }
    }
    if (j === pattern.length) {
        return i - j
    } else {
        return -1
    }
}

console.log(kmp(s, pattern))// 15