/**
 * @generator函数
 * next(),throw(),return()方法
 * 返回
 * {
 *   value:,
 *   done:bealen
 * }
 */

const generator = function* () {
    const val = yield new Promise(resolve => resolve(2 + 2));
    yield new Promise(resolve => setTimeout(resolve, 100));
    return val + 1;
}


// console.log(generator().throw())
console.log(generator().return())