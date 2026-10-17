/**
 * @132模式
 * 这里指的third是第三个位置，不是132中间的3
 * [3,1,4,2]
 * third只有在
 */
function find132pattern(nums: number[]): boolean {
    let n = nums.length
    // stack里存的是已经遍历过的非递增数 [2,1]
    let stack: number[] = []
    let third: number = -Infinity
    for (let i = n - 1; i >= 0; i--) {
        if (nums[i] < third) { return true }
        while (stack.length && nums[i] > stack[stack.length - 1]!) {
            third = stack.pop()!
        }
        stack.push(nums[i])
    }
    return false
};