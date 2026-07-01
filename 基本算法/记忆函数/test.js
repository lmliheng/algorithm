/**
 * @param {Function} fn
 * @return {Function}
 * @当fn入参是形式相同的对象时也会判定为缓存
 */
function memoize(fn) {
    let cache = new Map()
    return function (...args) {
        //   console.log(args)
        let arg = args.join(',')
        // arg 是个字符串
        if (cache.has(arg)) {
            return cache.get(arg)
        } else {
            cache.set(arg, fn(...args))
            return cache.get(arg)
        }

    }
}


let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
});

console.log(memoizedFn(2, 3)); // 5
console.log(memoizedFn(2, 3)); // 5
console.log(memoizedFn(2, 4)); // 6
console.log(memoizedFn(2, 3)); // 5
console.log(memoizedFn(2, 6)); // 8
console.log(callCount); // 3

callCount = 0;

const memoizedFn1 = memoize(function (a) {
    callCount += 1;
    return a
});
memoizedFn1({})
memoizedFn1({})
console.log(callCount) // 1
/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */