/**
 * @下一个更大元素2
 * 
 * nums是循环数组
 * 
 * 
 */

function nextGreaterElements(nums: number[]): number[] {
    let n = nums.length
    let NextMax = Array.from({ length: n }, () => -1)
    let stack = []
    for (let i = 0; i < n; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            let index = stack.pop()
            NextMax[index!] = nums[i]
        }
        stack.push(i)
    }

    for (let i = 0; i < n; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            let index = stack.pop()
            NextMax[index!] = nums[i]
        }
        stack.push(i)
    }

    console.log(NextMax)
    return NextMax
};