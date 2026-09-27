/**
 * @difficulty easy
 * @tags 数组,原地算法
 * @time O(n^2)
 * @space O(1)
 * @note splice 就地删零，最后在数组末尾补齐
 * @283. 移动零
 */
let nums = [0, 1, 0, 3, 12]
let zeroCount = 0
for (let i = 0; i < nums.length; i++) {
    console.log(i)
    if (nums[i] === 0) {
        nums.splice(i, 1)
        zeroCount++
        i--
    }

}


nums.push(...new Array(zeroCount).fill(0))

console.log(nums)
