/**
 * @组合总和
 * path没有写在回溯函数参数内
 */
// let candidates = [2, 3, 6, 7]
// let target = 7

var combinationSum = function (candidates, target) {
    let n = candidates.length
    let res = []
    let path = []
    const trackback = (start, sum) => {
        if (sum === target) {
            res.push([...path])
            return
        }
        if (sum > target) {
            return
        }
        for (let i = start; i < n; i++) {
            path.push(candidates[i])
            trackback(i, candidates[i] + sum)
            path.pop()
        }
    }
    trackback(0, 0)
    return res
};
