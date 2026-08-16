/**
 * @多维数组创建
 * 使用Array.from()和map都行
 */

/***
 * @二维
 */
let a2 = new Array(3).fill(0).map(() => new Array(4).fill(0))
console.log(a2)

/**
 * @三维
 */
let a3 = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => Array.from({ length: 2 }, () => 0)))
console.log(a3)