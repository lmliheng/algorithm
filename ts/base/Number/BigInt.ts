
/**
 * @BigInt
 * Number 能安全表示的整数范围是 -2^53 + 1 到 2^53 - 1
 */
let a = BigInt(10)
let b = 10n

/**
 * @可以和number类型比较
 * 但是===不等
 */
console.log(a>5)
console.log(b>5)