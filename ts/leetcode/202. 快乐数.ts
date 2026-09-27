/**
 * @difficulty easy
 * @tags 哈希表,数学
 * @time O(log n)
 * @space O(log n)
 * @note 用 Set 检测循环，过程中判断是否到 1
 * @202. 快乐数
 */
let n = 2

let set = new Set()
let res = n
while (true) {
    let str = res.toString()
    res = 0
    console.log("str=", str)
    for (let i = 0; i < str.length; i++) {
        console.log("str[i]=", str[i])
        res += (+str[i]) * (+str[i])
    }
    console.log("res=", res)
    if (res === 1) {
        console.log(true)
        break
    }

    if (set.has(res)) {
        console.log(false)
        break
    } else {
        set.add(res)

    }

}
