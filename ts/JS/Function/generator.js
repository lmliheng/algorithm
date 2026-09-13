/**
 * @generator函数
 * 
 * Generator 是 JS 中实现“暂停 / 恢复”执行的协程机制，通过 yield 和 next 实现双向通信，是 async/await 的底层基础
 * 
 * next(),throw(),return()方法
 * 返回 Iterator对象
 * {
 *   value:,
 *   done:bealen
 * }
 */

const generator = function* () {
    yield 1
    yield 2
    const val = yield new Promise(resolve => resolve(2 + 2));
    yield new Promise(resolve => setTimeout(resolve, 100));
    return val + 1;
}

console.log(generator.next())
console.log(generator.next())
// console.log(generator().throw())
console.log(generator().return())