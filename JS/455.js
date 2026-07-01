/**
 * @分发饼干
 * @待优化
 */
let g = [1, 2]
let s = [1, 2, 3]
g.sort((a, b) => b - a)
s.sort((a, b) => b - a)
console.log(g, s)
let res = 0
let s_used = new Array(s.length).fill(false)
// 双循环...
for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < s.length; j++) {
        if (s_used[j]) {
            continue
        }
        if (s[j] >= g[i]) {
            res++
            s_used[j] = true
            break
        } else {
            break
        }
    }
}
console.log(res)