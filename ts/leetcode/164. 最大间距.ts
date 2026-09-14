/**
 * @164. 最大间距
 */

let nums: number[] = [3, 6, 9, 1]
// 没有符合题意的解法
if (nums.length < 2) {
    return 0
}

nums.sort((a: number, b: number): number => a - b)
let arr: (number | undefined)[] = nums.map((item: number, index: number): number | undefined => {
    if (index !== nums.length - 1) {
        return nums[index + 1] - item
    }
})
arr.splice(nums.length - 1, 1)

console.log(arr)

console.log(Math.max(...arr as number[]))

export {};
