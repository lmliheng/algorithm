/**
 * @输入单词需要的最少按键次数1
 * word 中的所有字母互不相同。
 */
let word = "xycdefghij"
//"abcde"
let n = word.length
let res = 0
let a = Math.floor(n / 8)
let b = n % 8


for (let i = 0; i < a; i++) {
    if (a < 0) {
        break
    }
    res += (8 * (i + 1))
}

res += b * (a + 1)

console.log(res)