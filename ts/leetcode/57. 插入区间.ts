
var insert = function (intervals: number[][], newInterval: number[]) {
    intervals.push(newInterval)
    return merge(intervals)
};

var merge = function (intervals: number[][]) {
    let sortIntervals = intervals.sort((a, b) => a[0] - b[0])
    let res: number[][] = []
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