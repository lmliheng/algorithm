/**
 * @difficulty easy
 * @tags 数组,模拟
 * @time O(n)
 * @space O(n)
 * @note 拼成字符串按0切分，打印各段长度
 * @485. 最大连续1的个数
 */
let nums = [1, 1, 0, 1, 1, 1]
console.log(nums.join('').split('0').map(item => item.length))
