/**
 * @39. 组合总和
 */
function combinationSum(candidates: number[], target: number) {
    let n = candidates.length
    let res: number[][] = []
    let path: number[] = []
    const trackback = (start: number, sum: number) => {
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