
let p1 = new Promise((resolve, reject) => console.log(''))
let p2 = new Promise((resolve, reject) => setTimeout(() => resolve('9'), 1000))

console.time('pending')
let res = await p2 //改成p1 await 一个永远pending的Promise , 导致后续同步任务都不会执行
console.timeEnd('pending')
console.log(res)