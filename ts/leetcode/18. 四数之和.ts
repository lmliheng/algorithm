/**
 * @18. 四数之和
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */


/**
 * 
 * @回溯解法
 * 超时.
 */
function fourSum(nums: number[], target: number) {
    let res: number[][] = []
    let n = nums.length

    const backtrack = (start: number, path: number[]) => {
        if (path.length === 4) {
            if (path[0] + path[1] + path[2] + path[3] === target) {
                res.push([...path])
            }
            return
        }

        for (let i = start; i <= n; i++) {
            path.push(nums[i])
            backtrack(i + 1, path)
            path.pop()
        }
    }

    backtrack(0, [])

    // 去重
    res.map(item => item.sort((a, b) => a - b))
    res = res.filter((item, index) => {
        return res.findIndex(i => i[0] === item[0] && i[1] === item[1] && i[2] === item[2] && i[3] === item[3]) === index
    })
    return res
};