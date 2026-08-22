/**
 * @最小覆盖子串
 * 
 * 滑动窗口+哈希表
 * 先找到以i结尾的合法子串，通过map里的value是否小于等于0判断，用cnt表示小于等于0的key个数
 * 如果cnt==0 子串合法，再使用left从左边压缩，尝试减小子串长度，一旦不合法停止压缩，
 * 每次进入while都合法，可以记录start和最小长度len
 * 
 * 为什么不直接使用left作为start？明显的，在最后left会增一，其实start=left-1
 * 
 * 
 */
// let s = "ADOBECODEBANC"
// let t = "ABC"
function minWindow(s, t) {
    let t_len = t.length
    let s_len = s.length
    let map = new Map()
    for (let i = 0; i < t_len; i++) {
        if (!map.has(t[i])) {
            map.set(t[i], 1)
        } else {
            map.set(t[i], map.get(t[i]) + 1)
        }
    }
    let cnt = map.size
    console.log(map, cnt)
    let left = 0
    let start = -1
    let len = Infinity
    for (let i = 0; i < s_len; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) - 1)
        }
        if (map.get(s[i]) == 0) {
            cnt--
        }

        // 向右缩短 获取以i结尾的最小长度的 合法子串。每次进入while都是合法的
        while (cnt == 0) {
            // console.log(left,i)
            if (len > i - left + 1) {
                len = i - left + 1
                start = left
            }
            if (map.has(s[left])) {
                map.set(s[left], map.get(s[left]) + 1)
            }
            if (map.get(s[left]) > 0) {
                cnt++
            }
            left++
        }
    }

    return start == -1 ? '' : s.substring(start, start + len)
};



/**
 * @错误解法 
 */
function minWindow1(s, t) {

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



}

