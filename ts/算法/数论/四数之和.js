/**
 * @四数之和
 * 
 * 参考的是灵神题解..，剪枝+遍历..
 */

let nums = [1, 0, -1, 0, -2, 2]
let target = 1

let res = []
let n = nums.length
nums.sort((a, b) => a - b)
for (let a = 0; a < n - 3; a++) {
    const x = nums[a]// 可以转换成long long？
    if ((x + nums[a + 1] + nums[a + 2] + nums[a + 3]) > target) { break }
    if ((x + nums[n - 3] + nums[n - 2] + nums[n - 1]) < target) { continue }
    for (let b = a + 1; b < n - 2; b++) {
        const y = nums[b]
        if ((x + y + nums[b + 1] + nums[b + 2]) > target) { break }
        if ((x + y + nums[n - 2] + nums[n - 1]) < target) { continue }
        let c = b + 1
        let d = n - 1
        while (c < d) {
            const s = x + y + nums[c] + nums[d]
            if (s > target) { d-- }
            else if (s < target) { c++ }
            else {
                res.push([x, y, nums[c], nums[d]])
                for (c++; c < d && nums[c] === nums[c - 1]; c++);
                for (d--; c > d && nums[d] === nums[d + 1]; d--);
            }
        }
    }
}

console.log(res)