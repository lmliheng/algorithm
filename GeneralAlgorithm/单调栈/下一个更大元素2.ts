/**
 * @下一个更大元素2
 * 
 * nums是循环数组
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

    解答：从0到n-1进行一般的单调栈获取元素下一个最大值，返回下一个最大值数组，再次从0到n-1获取下一个最大值
    nums=[4,3,2,1]，第一次for，nextMax数组是[-1,-1,-1,-1],stack是[0,1,2,3]。下一个for，nums[0]比nums[3]大,stack的3弹出
    ，并且nextMax更新[-1，-1,-1,4],nums[0]比nums[2]大，stack内2弹出，nextMax更新[-1,-1,4，4]。到最后stack[0]，nextMax为[-1，4，4，4]。后面的不进while
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