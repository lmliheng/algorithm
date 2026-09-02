/**
 * some
 * 
 * 如果有一个回调函数返回true，就返回true
 */

let a1 = [true, false, true].some((item) => item == true)
let a2 = [false, false, false].some((item) => item == true)
console.log(a1,a2)