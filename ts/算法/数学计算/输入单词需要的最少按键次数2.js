/**
 * @输入单词需要的最少按键次数II
 * 
 * 
 * @这个解法有纰漏吗 因为前8个字母需要在前面出现，如果把最后一个出现频率最高的字符放第一位 ... 也没问题..
 */

let word = "aabbccddeeffgghhiiiiii"
// "xyzxyzxyzxyzxabcdefghijkkmmnooopqrest"


let res = 0
let map = new Map()
let n = word.length
for (let i = 0; i < n; i++) {
    if (!map.has(word[i])) {
        map.set(word[i], 1)
    } else {
        map.set(word[i], map.get(word[i]) + 1)
    }
}
let arr = [...map].sort((a, b) => b[1] - a[1])
console.log(arr,map)
let len = arr.length
for (let i = 0; i < len; i++) {
    let bit = Math.floor(i / 8) + 1
    console.log(i, bit, map.get(arr[i][0]))
    res += map.get(arr[i][0]) * bit
}
console.log(res)