/**
 * @最长回文子串
 * 
 * 中心扩散法 双指针
 * 
 * 返回一个最长回文子串
 */

let inPutStr = 'abbacca'

let n = inPutStr.length
let res = ''
if (!n) {
    return ''
}
for (let i = 0; i < n; i++) {
    expand(i, i)
    expand(i, i + 1)
}
function expand(left, right) {
    while (left >= 0 && right < n && inPutStr[left] == inPutStr[right]) {
        left--
        right++
    }
    if (right - left - 1 > max_len) {
        res = inPutStr.slice(left + 1, right)

    }
}
console.log(res)