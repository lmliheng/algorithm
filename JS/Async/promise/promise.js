/**
 * @原生支持的Promise以及相关方法
 * Promise是异步解决方案
 * 
 * new Promise((resolve, reject) => reject('拒绝')) 是同步的，立即执行
 * 后面的then，catch是异步的，一旦敲定resolove执行then回调，敲定reject执行catch回调。没有就一直处于pending
 * 
 */
let p = new Promise((resolve, reject) => reject('拒绝'))
p.then((value) => console.log(value))
    .catch((e) => console.log(e))
// let pending_p = new Promise((resolve, reject) => console.log('1  pending...')) 打印pending_p就是Promise { <pending> }


/**
 * @Promise.all()
 * 如果都resolve：数组形式返回所有promise的resolve结果，状态是resovle
 * 有一个reject：返回第一个reject的结果，all状态是reject
 * 存在pending，则整个all均不兑现，一直处于pending。解决：1. 设置超时reject，2. 使用Promise.allSettld()
 */
let p1 = new Promise((resolve, reject) => resolve('1'))
let p2 = new Promise((resolve, reject) => reject('拒绝2'))
let p3 = new Promise((resolve, reject) => resolve('3'))
let p4 = new Promise((resolve, reject) => reject('拒绝4'))

let p5 = new Promise((resolve, reject) => console.log(''))

let all1 = Promise.all([p1, p2, p3, p4])
let all2 = Promise.all([p1, p3, p5])
let all3 = Promise.all([p1, p3])

all1.then((v) => console.log(v))
    .catch((e) => console.log('all1:', e))

all2.then((v) => console.log(v))
    .catch((e) => console.log('all2:', e))
console.log(all2)


/**
 * @Promise.any()
 * 
 * 所有都拒绝，返回AggregateError 
 * 如果有兑现，返回第一个兑现的结果
 * 
 * 空数组(没有promise)，则返回一个永远pending的Promise
 */
let p6 = new Promise((resolve, reject) => reject('拒绝6'))
let p7 = new Promise((resolve, reject) => reject('拒绝7'))
let p8 = new Promise((resolve, reject) => reject('拒绝8'))
let p9 = new Promise((resolve, reject) => setTimeout(() => resolve('9'), 1000))
let p10 = new Promise((resolve, reject) => setTimeout(() => resolve('10'), 2000))

let any1 = Promise.any([p6, p7, p8])
any1.then((v) => console.log(v))
    .catch((e) => console.log(e))

let any2 = Promise.any([p10, p6, p7, p8, p9])
any2.then((v) => console.log(v))
    .catch((e) => console.log(e))