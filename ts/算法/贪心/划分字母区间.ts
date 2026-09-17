/**
 * @划分字母区间
 */



/**
 * 
 * @这个解法结合了合并区间56
 * 开销比较大，需要找更优解
 * 尽可能多的片段，说明要：能不合并就不合并
 * 
 * 
 */
import { merge } from '../../leetcode/56. 合并区间.js'
var partitionLabels = function (s: string) {
    let res = []
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], [i, i])
        } else {
            let [a1, a2] = map.get(s[i])
            map.set(s[i], [a1, i])
        }
    }
    let arr = [...map].map((item) => item[1]).sort((a, b) => a[0] - b[0])
    return merge(arr).map((item) => item[1] - item[0] + 1)
};


