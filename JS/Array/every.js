/**
 * @和some类似用法
 * 
 * 如果有一个回调函数返回false，就返回false
 */

let a1 = [true, false, true].every((item) => item == true)
let a2 = [true, true, true].every((item) => item == true)
console.log(a1, a2)