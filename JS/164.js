let nums = [3, 6, 9, 1]
// 没有符合题意的解法
if (nums.length < 2) {
    return 0
}

nums.sort((a, b) => a - b)
let arr = nums.map((item, index) => {
    if (index !== nums.length - 1) {
        return nums[index + 1] - item
    }
})
arr.splice(nums.length - 1, 1)

console.log(arr)

console.log(Math.max(...arr))