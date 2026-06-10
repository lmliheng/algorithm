/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    let cache = new Map()
    return function (...args) {
     //   console.log(args)
        let arg = args.join(',')
        if (cache.has(arg)) {
            return cache.get(arg)
        } else {
            cache.set(arg,fn(...args))
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