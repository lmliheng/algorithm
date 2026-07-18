/**
 * @最小覆盖子串
 * 
 * 错误的解法：没有指定必须按照t里面元素的相对顺序
 */
let s = "CCABCECODEBANCCC"
// "CCCCCCABCECODEBANC"
let t = "ABCD"

let s_len = s.length
let t_len = t.length


// 第一个元素必须是t[0]

let start = []
for (let i = 0; i < s_len; i++) {
    if (s[i] === t[0]) {
        start.push(i)
    }
}
console.log(start)

// 窗口从t_len滑动后 扩张至t_len+1 再滑动 直到扩张至s_len
for (let i = t_len; i < s_len - t_len; i++) {

    // 滑动,窗口宽度是i
    for (let j = 0; j < start.length; j++) {
        if (start[j] >= (s_len - i)) {
            break
        }
        let str = ''
        let p = 0
        for (let m = start[j]; m < start[j] + i; m++) {
            if (s[m] === t[p]) {
                p++
            }
        }
        if (p === t_len) {
            console.log(s.slice(start[j], start[j] + i))
            return s.slice(start[j], start[j] + i)
        }

    }

}

return ''
