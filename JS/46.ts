let res: number[][] = []
const backtrack = (nums: number[], path: number[], used: boolean[]) => {
    if (path.length === nums.length) {
        res.push([...path]) // 深拷贝，不能直接push（path），放进去的只是path的路径
        console.log(res)
        console.log("完成一次排列")
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


let nums = [1, 2, 3]
let path: number[] = []
let used: boolean[] = new Array(nums.length).fill(false)
backtrack(nums, path, used)
console.log(res)
