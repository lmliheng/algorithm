
/**
 * @lc1358
 * @使用滑动窗口超时
 */

let s = "ababbbc"
let res = 0
if (s.length < 3) { return 0 }
let n = s.length
let a_num = 0
let b_num = 0
let c_num = 0

for (let i = 3; i <= n; i++) {
    a_num = 0
    b_num = 0
    c_num = 0
    //窗口长度为3，4...n,长度重置,abc数量也重置
    let win = []
    // 初始化
    for (let j = 0; j < i; j++) {
        if (s[j] === 'a') { a_num++ }
        if (s[j] === 'b') { b_num++ }
        if (s[j] === 'c') { c_num++ }
        win.push(s[j])
    }

    if (a_num && b_num && c_num) {
        res++
        console.log(a_num, b_num, c_num, '===', win)
    }

    //滑动
    for (let j = i; j < n; j++) {
        if (s[j - i] === 'a') { a_num-- }
        if (s[j - i] === 'b') { b_num-- }
        if (s[j - i] === 'c') { c_num-- }
        win.shift()
        if (s[j] === 'a') { a_num++ }
        if (s[j] === 'b') { b_num++ }
        if (s[j] === 'c') { c_num++ }
        win.push(s[j])
        if (a_num && b_num && c_num) {
            res++
            console.log(a_num, b_num, c_num, '===', win)
        }

    }

}


console.log(res)