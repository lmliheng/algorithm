/**
 * @函数的柯里化
 * 
 * **柯里化** 函数的定义是接受与原函数相同数量或更少数量的参数，并返回另一个 **柯里化** 后的函数或与原函数相同的值。
 * 实际上，当你调用原函数，如 `sum(1,2,3)` 时，它将调用 **柯里化** 函数的某个形式，如 `csum(1)(2)(3)`， `csum(1)(2,3)`， `csum(1,2)(3)`，或 `csum(1,2,3)` 。
 * 所有调用 **柯里化** 函数的方法都应该返回与原始函数相同的值。
 */

/**
 * 
 * @没有使用外部arr
 */
function curry(fn: Function) {
    return function curried(...args: any[]) {
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            return function (...nextArgs: any[]) {
                return curried(...args, ...nextArgs);
            };
        }
    };
}


/**
 * 
 * @存在问题
 * arr放外面 多次调用 curry 后的函数会互相影响  ！
 */
function curry1(fn: Function) {
    let arr = []
    return function curried(...args: any[]) {
        arr.push(...args)
        // fn.length是期望收到的参数数量
        if (arr.length === fn.length) {
            return fn(...arr)
        } else {
            return curried
        }
    }
}

/**
 * @leetcode-solu的柯里化函数
 * 和curry1一样，TS中curried不允许接受形参
 */
var curry2 = function (fn: Function) {
    let args = []
    // function.length 可以获取函数参数的个数
    return function curried() {
        args.push(...arguments)
        // 到达参数个数才进行调用
        if (args.length === fn.length) {
            return fn(...args)
        } else {
            return curried
        }
    };
};


if (process.argv[2] === 'test') {
    // 箭头函数没有arguments
    let sum = (x: number, y: number, z: number) => {
        return x + y + z
    };
    let curried_sum = curry(sum)

    console.log(curried_sum(1))
    console.log(curried_sum(1)(2))
    console.log(curried_sum(1)(2)(3))

}