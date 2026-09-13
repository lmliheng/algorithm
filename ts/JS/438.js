
let s = "cbaebabacd"
let p = "abc"
let p_len = p.length
let s_len = s.length
if (s_len < p_len) {
    return []
}
let res = []
let p_arr = new Array(26).fill(0)
let window = new Array(26).fill(0)
const GetWordIndex = (word) => {
    return word.charCodeAt() - 97
}
const ArrayCompare = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b)
}
// 初始化
for (let i = 0; i < p_len; i++) {
    p_arr[GetWordIndex(p[i])]++
    window[GetWordIndex(s[i])]++
}
if (ArrayCompare(p_arr, window)) { res.push(0) }

for (let i = p_len; i < s_len; i++) {
    // 左边出去的字符 i-p_len
    window[GetWordIndex(s[i - p_len])]--
    // 右边进入的字符 i
    window[GetWordIndex(s[i])]++
    if (ArrayCompare(p_arr, window)) { res.push(i - p_len + 1) }

}

console.log(res)