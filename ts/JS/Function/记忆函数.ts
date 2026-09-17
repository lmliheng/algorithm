/**
 * @param {Function} fn
 * @return {Function}
 * 
 * @当fn入参是形式相同的对象时也会判定为缓存
 */
function memoize(fn: (...args: any[]) => any) {
    let cache = new Map()
    return function (...args: any[]) {
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

/**
 *
 * @当fn入参是形式相同的对象时不会判定为缓存
 * 
 * 缓存是持久的不是只缓存上一个
 * 只要fn形参里有对象或者数组都不缓存
 */
function memoize1(fn: (...args: any[]) => any) {
    let cache = new Map()
    return function (...args: any[]) {

        // 一旦发现args元素里有对象或者数组，直接执行fn
        let flag = false
        for (let i = 0; i < args.length; i++) {
            if (args[i] instanceof Object) {
                flag = true
                break
            }
        }
        if (flag) { return fn(...args) }

        //
        let arg = JSON.stringify(args)
        if (cache.has(arg)) {
            return cache.get(arg)
        } else {
            cache.set(arg, fn(...args)) // 执行一次fn
            return cache.get(arg)
        }
    }
}


if (process.argv[2] == 'test') {

    let callCount = 0;
    const memoizedFn = memoize1(function (a, b) {
        callCount += 1;
        return a + b;
    });

    memoizedFn(2, 3);
    memoizedFn(2, 3);
    memoizedFn(2, 4);
    memoizedFn(2, 3);
    memoizedFn(2, 6);
    console.log(callCount); // 3

    callCount = 0;

    const memoizedFn1 = memoize1(function (a) {
        callCount += 1;
        return a
    });
    memoizedFn1({})
    memoizedFn1({})
    memoizedFn1({})
    console.log(callCount) // 1

}


