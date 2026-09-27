/**
 * @difficulty medium
 * @tags 回溯,组合,数组
 * @note 排序后回溯，同层跳过重复元素去重
 * @40. 组合总和 II
 * 
 */
var combinationSum2 = function (candidates: number[], target: number) {
    let stack: number[] = []
    candidates.sort((a, b) => a - b)
    let n = candidates.length
    let res: number[][] = []
    const trackBack = (stack: number[], start: number, target: number) => {
        if (target === 0) {
            res.push([...stack])
            return
        }
        for (let i = start; i < n; i++) {
            if (target - candidates[i] < 0) {
                break
            }
            // 
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue
            }
            stack.push(candidates[i])
            trackBack(stack, i + 1, target - candidates[i])
            stack.pop()
        }

    }

    trackBack(stack, 0, target)
    return res
};