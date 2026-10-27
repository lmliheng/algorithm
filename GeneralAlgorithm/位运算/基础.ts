// 符号	描述	运算规则
// &	与	两个位都为1时，结果才为1
// |	或	两个位都为0时，结果才为0
// ^	异或	两个位相同为0，相异为1
// ~	取反	0变1，1变0
// <<	左移	各二进位全部左移若干位，高位丢弃，低位补0
// >>	右移	各二进位全部右移若干位，高位补0或符号位补齐


/**
 * @交换值
 */
let a = 6
let b = 7
a ^= b
b ^= a
a ^= b
console.log(a, b)



/**
 * @奇偶
 */
const isEven = (n: number) => (n & 1) === 0 ? true : false
const isOdd = (n: number) => (n & 1) === 1 ? true : false

console.log(isEven(a)) //true
console.log(isOdd(a)) //true

/**
 * @取中间值
 */
console.log(a >> 1) //Math.floor(a/2)


/**
 * @置数
 */
console.log(a ^ 7) //000001110 使最后三位取反
console.log(a & (~7)) //00001000 使最后三位取0
console.log(a | 7) //00001111 使最后三位取1
console.log(a & (a - 1)) //0101 & 0100 = 0100  最后一位置0
// 等价a & (~1)
console.log(a & (~1)) 
