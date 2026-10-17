const a = 9 // 00001001

console.log(a ^ 7) //000001110 使最后三位取反

console.log(a & (~7)) //00001000 使最后三位取0
console.log(a | 7) //00001111 使最后三位取1

console.log(a & (a-1)) //0101 & 0100 = 0100  最后一位置0
// 等价a & (~1)
console.log(a & (~1)) 