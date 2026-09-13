/**
 * @param {Function} fn
 * @return {Function}
 * @当fn入参是形式相同的对象时不会判定为缓存也就是无缓存直接执行
 * @缓存是持久的不是只缓存上一个
 */
function memoize(fn) {
    let cache = new Map()
    return function (...args) {

        // 一旦发现args元素里有对象或者数组，直接执行fn
        let flag = false
        for (let i = 0; i < args.length; i++) {
            if (args[i] instanceof Object) {
                flag = true
                break
            }
        }
        if (flag) { return fn(...args) }

        let arg = JSON.stringify(args)
        console.log(arg)
        if (cache.has(arg)) {
            return cache.get(arg)
        } else {
            cache.set(arg, fn(...args)) // 执行一次fn
            return cache.get(arg)
        }
    }
}


let callCount = 0;

const memoizedFn1 = memoize(
    function (a, b) {
        callCount++
        return a + b;
    });
memoizedFn1(1, 2)
memoizedFn1(1, 4)
memoizedFn1(1, 2)
memoizedFn1(1, 3)
memoizedFn1(1, 2)
console.log(callCount) // 2

callCount = 0
const memoizedFn2 = memoize(
    function (a, b) {
        callCount++
        return ({ ...a, ...b });
    });
memoizedFn2({})
memoizedFn2({})
memoizedFn2({})
memoizedFn2({}, {})
console.log(callCount) // 2