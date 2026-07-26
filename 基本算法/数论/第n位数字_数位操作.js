/**
 * @第n位数字
 * 数位操作
 */
let n = 30

let bit = 1
let bitNum = 9
let start = 1
// 180  
//
while (n > bitNum) {
    n -= bitNum
    bit++
    start *= 10
    bitNum = 9 * start * bit
}

let numIndex = Math.floor((n - 1) / bit)
let num = start + numIndex

let digtIndex = (n - 1) % bit

console.log(num, digtIndex)
console.log(+(String(num)[digtIndex])) 