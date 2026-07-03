/**
 * @不同子序列115 - 错误的回溯
 * 困难
 */
let s = "rabbbit"
let t = "rabbit"

let res = 0
let n = t.length
let visit = new Array(n).fill(false)
/**
 * 
 * @param {*} path 子序列在s索引组成的数组
 */
const trackback = (path) => {
    if (path.length === n) {
        res++
        return
    }
    for (let i = 0; i < n; i++) {
        if (!visit[i]) {
            if (path.length === 0) {

            }else{

            }

        }
    }


}
trackback([])