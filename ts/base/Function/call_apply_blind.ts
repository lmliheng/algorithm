/**
 * @call,apply,bind 改变函数执行时的 this 指向
 * 
 * call，立即执行，逐个传入，函数返回值
 * apply，立即执行，数组传入，函数返回值
 * bind，返回新函数，逐个传入，返回绑定了 this 的新函数
 */
let obj = { y: 10 }
function test(this: { y: number }, x: number) {
    return x + this.y
}

console.log(test.call(obj, 1))
console.log(test.apply(obj, [1]))
console.log(test.bind(obj,2)())