function fn() {
    console.log(this)
    return 0
}

/**
 *     call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
 */

fn.call(1) // 执行fn 但此时this是Number 1
console.log(fn)

