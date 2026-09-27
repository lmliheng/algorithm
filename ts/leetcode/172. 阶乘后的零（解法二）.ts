/**
 * @difficulty medium
 * @tags 数学
 * @time O(log n)
 * @space O(1)
 * @note 累加 n/5、n/25…，统计因子 5 的个数
 * @172. 阶乘后的零（解法二）
 */

let n = 30
console.log(Math.floor(n / 5) + Math.floor(n / 25) + Math.floor(n / 125) + Math.floor(n / 625) + Math.floor(n / 3125))
