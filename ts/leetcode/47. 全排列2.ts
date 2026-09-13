/**
 * @47. 全排列 II
 */


function permuteUnique(nums: number[]) {

    let res: number[][] = []
    const backtrack = (nums: number[], path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            res.push([...path]) // 深拷贝，不能直接push（path），放进去的只是path的路径
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue
            }
            used[i] = true
            path.push(nums[i])
            backtrack(nums, path, used)

            path.pop()
            used[i] = false

        }

    }


    let path: number[] = []
    let used = new Array(nums.length).fill(false)
    backtrack(nums, path, used)
    let set: Set<string> = new Set()
    for (let i = 0; i < res.length; i++) {
        let str = res[i].toString()
        if (set.has(str)) {
            continue
        } else {
            set.add(str)
        }

    }

    return [...set].map(item => item.split(',').map(item => +item))

};