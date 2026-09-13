/**
 * @划分字母区间
 */

/**
 * 
 * @这个解法结合了合并区间56
 * 开销比较大，需要找更优解
 * 尽可能多的片段，说明要：能不合并就不合并
 */
var partitionLabels = function (s) {
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


function merge(intervals) {
    let sortIntervals = intervals.sort((a, b) => a[0] - b[0])
    let res = []
    sortIntervals.forEach((item, index) => {
        if (index === 0) {
            res.push(item)
        }
        if (res[res.length - 1][1] < item[0]) {
            res.push(item)
        }
        if (item[0] <= res[res.length - 1][1]) {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], item[1])
        }

    })
    return res
};