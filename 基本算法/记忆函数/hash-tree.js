function memoize(fn) {
    const map = new Map()
    return function (...args) {
        let curMap = map
        for (let i = 0; i < args.length; i++) {
            const p = args[i]
            if (!curMap.has(p)) {
                curMap.set(p, new Map())
            }
            curMap = curMap.get(p)
        }
        if (curMap.has(fn)) {
            return curMap.get(fn)
        }
        else {
            const ans = fn(...args)
            curMap.set(fn, ans)
            return ans
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