/**
 * @115. 不同的子序列
 * 困难 - 错误的回溯
 */
let s: string = "rabbbit"
let t: string = "rabbit"

let res: number = 0
let n: number = t.length
let visit: boolean[] = new Array(n).fill(false)
/**
 *
 * @param {*} path 子序列在s索引组成的数组
 */
const trackback = (path: number[]): void => {
    if (path.length === n) {
        res++
        return
    }
    for (let i = 0; i < n; i++) {
        if (!visit[i]) {
            if (path.length === 0) {

            } else {

            }
        }
    }
}
trackback([])
console.log(res)

export {};
