/**
 * @最小覆盖子串
 * 
 * 越长越合法的滑动窗口
 * 
 * 左右指针维护的滑动窗口
 * 
 * 错误....
 */
let s = "ADOBECODEBANC"
let t = "ABC"

let s_len = s.length
let t_len = t.length


let minLen = Infinity
let start = -1

let map = new Map()
for (let i = 0; i < t_len; i++) {
    map.set(t[i], (map.get(t[i]) || 0) - 1)
}
console.log(map)

let debt = map.size
let l = 0
for (let r = 0; r < s_len; r++) {
    let rc = s[r]
    map.set(rc, (map.get(rc) || 0) + 1)
    if (map.get(rc) === 0) {
        debt--
    }
    // 窗口合法后收缩左指针
    while (debt === 0) {
        console.log('合法窗口：', l, r)

        if (r - l + 1 < minLen) {
            minLen = r - l + 1
            start = l
        }
        let lc = s[l]
        console.log(map)
        map.set(lc, map.get(lc) - 1)
        console.log(map)
        if (map.get(lc) === 0) {
            // 窗口不再合法
            debt++
        }
        l++
    }

}
let res = start === -1 ? '' : s.substring(start, start + minLen)
console.log(res)
return start === -1 ? '' : s.substring(start, start + minLen)
