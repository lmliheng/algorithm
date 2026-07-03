/**
 * @最长有效括号
 * @超时 滑动窗口+栈判断合法括号
 * @param {*} str 
 * @returns 
 */

const check = (str) => {
    let quene = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            quene.push(1)
        } else {
            if (quene.length === 0) {
                return false
            } else {
                if (quene[quene.length - 1] === 1) {
                    quene.pop()
                }
            }
        }
    }
    return quene.length === 0 ? true : false
}

let s = ")()())"
let n = s.length
// 滑动窗口
for (let i = n; i > 0; i--) { // i是窗口大小
    if (i % 2) { continue }
    let win = new Array(i).fill('')
    for (let j = 0; j < i; j++) {
        win[j] = s[j]
    }
    if (check(win.join(''))) { console.log(i); return }
    // 滑动
    for (let j = i; j < n; j++) { // 从i开始 而不是i-1 ，i-1已经初始化了
        if (j >= n) {
            break
        }
        win.shift()
        win.push(s[j])
        if (check(win.join(''))) { console.log(i); return }
    }

}
console.log(res)