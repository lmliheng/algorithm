/**
 * @difficulty medium
 * @tags 回溯,排列
 * @time O(n*n!)
 * @space O(n)
 * @note 回溯配used数组，叶子处深拷贝收集
 * @46. 全排列
 */

function permute(nums: number[]): number[][] {
    let n = nums.length
    let res: number[][] = []
    let used = Array.from({ length: n }, () => false)
    const BackTrack = (path: number[]) => {
        if (path.length == n) {
            res.push([...path])
            return
        }
        for (let i = 0; i < n; i++) {
            if (used[i]) {
                continue
            }
            path.push(nums[i])
            used[i] = true
            BackTrack(path)
            path.pop()
            used[i] = false
        }
    }
    BackTrack([])
    return res
};