/**
 * @difficulty easy
 * @tags 贪心,排序,数组
 * @time O(n*log n)
 * @space O(1)
 * @note 排序后取偶数下标元素之和
 * @561. 数组拆分
 */
let nums = [1, 4, 3, 2]
let res = 0
nums.sort((a, b) => a - b)
for (let i = 0; i < nums.length; i++) {
    if ((i & 1) === 0) {
        res += nums[i]
    }
}
console.log(res)
