/**
 * @difficulty easy
 * @tags 位运算,字符串
 * @time O(n)
 * @space O(1)
 * @note 两串字符编码全部异或，剩下就是多的字符
 * @389. 找不同
 */
let s = "abcd"
let t = "abcde"
let res = 0
for (let ch of s) {
    res ^= ch.charCodeAt(0)
}
for (let ch of t) {
    res ^= ch.charCodeAt(0)
}

 console.log(String.fromCharCode(res))
