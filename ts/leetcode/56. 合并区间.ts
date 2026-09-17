/**
 * @56. 合并区间
 * 
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */

export function merge(intervals: number[][]) {
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