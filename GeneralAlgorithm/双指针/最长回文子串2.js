/**
 * @最长回文子串2
 * shopee第二题
 * 
 * 有多个最长回文子串的情况
 */

let inPutStr = 'abbacca'

let n = inPutStr.length
let res = []
let max_len = 0
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
        res = [inPutStr.slice(left + 1, right)]
        max_len = right - left - 1
    } else if (right - left - 1 == max_len) {
        res.push(inPutStr.slice(left + 1, right))
    }


}
console.log(res)