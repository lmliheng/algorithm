
/**
 * @Promise的实现
 * 
 * 看后面使用ts完成，有充分的类型推断
 */
export class MyPromise {
    state = "pending";
    value = undefined;
    reason = undefined;
    resolveCallbacks = [];
    rejectCallbacks = [];

    constructor(fn) {
        const resolveHandler = (value) => {
            if (this.state === "pending") {
                this.state = "fulfilled";
                this.value = value;
                this.resolveCallbacks.forEach((fn) => fn(this.value));
            }
        };
        const rejectHandler = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.rejectCallbacks.forEach((fn) => fn(this.reason));
            }
        };
        try {
            fn(resolveHandler, rejectHandler);
        } catch {
            rejectHandler();
        }
    }



    then(fn1, fn2) {
        // 处理非函数参数
        fn1 = typeof fn1 === "function" ? fn1 : (value) => value;
        fn2 = typeof fn2 === "function" ? fn2 : (reason) => { throw reason };
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = fn1(this.value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            const handleRejected = () => {
                try {
                    const result = fn2(this.reason);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            if (this.state === "fulfilled") {
                handleFulfilled();
            } else if (this.state === "rejected") {
                handleRejected();
            } else {
                this.resolveCallbacks.push(handleFulfilled);
                this.rejectCallbacks.push(handleRejected);
            }
        });
    }

    catch() {

    }

    /**
     * @静态方法resolve
     * 直接让promise敲定filfulled
     */
    static resolve() {


    }

    /**
     * 
     * @静态方法any
     * 等catch写好后再把Promise换成MyPromise
     * 
     * an方法内容参考promise.js文件
     */
    static any(promiseArray) {
        if (Array.isArray(promiseArray) == false || promiseArray.length == 0) {
            return new Promise(() => { })
        }
        let n = promiseArray.length
        return new Promise((resolve, reject) => {
            let settled = false
            let rejectCount = 0
            let errors = []
            for (let i = 0; i < n; i++) {
                Promise.resolve(promiseArray[i]).then(
                    (value) => {
                        if (!settled) {
                            settled = true
                            resolve(value)
                        }
                    },
                    (e) => {
                        if (!settled) {
                            errors[i] = e
                            rejectCount++
                            if (rejectCount == n) {
                                const aggregateError = new AggregateError(errors, '所有promise都被拒绝了')
                                reject(aggregateError)
                            }
                        }
                    }
                )
            }
        })
    }
}




// 测试

if (process.argv[2] == 'promise') {
    // 案例1：基本链式调用

    const promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve("成功数据");
        }, 1000);
    });

    promise1
        .then(
            (data) => {
                console.log("第一个then成功:", data);
                return "处理后的数据";
            },
            (err) => {
                console.log("第一个then失败:", err);
            }
        )
        .then((data) => {
            console.log("第二个then成功:", data);
        });

    // 案例2：错误处理

    const promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("出错了"));
        }, 500);
    });

    promise2.then(
        (data) => console.log("成功:", data),
        (err) => console.log("捕获错误:", err.message)
    );

    // 案例3：同步值
    const promise3 = new MyPromise((resolve) => {
        resolve("立即成功");
    });
    promise3.then((data) => {
        console.log("同步结果:", data);
    });

    // 案例4：链式传递
    console.log("\n=== 案例4：链式传递 ===");

    new MyPromise((resolve) => {
        resolve(1);
    })
        .then((num) => {
            console.log("第一步:", num);
            return num + 1;
        })
        .then((num) => {
            console.log("第二步:", num);
            return num * 2;
        })
        .then((num) => {
            console.log("最终结果:", num);
        });

    // 案例5：异步链式
    new MyPromise((resolve) => {
        setTimeout(() => resolve("A"), 200);
    })
        .then((result) => {
            console.log("收到:", result);
            return new MyPromise((resolve) => {
                setTimeout(() => resolve("B"), 300);
            });
        })
        .then((result) => {
            console.log("收到:", result);
            return "C";
        })
        .then((result) => {
            console.log("最终:", result);
        });
}



if (process.argv[2] == 'any') {
    let p6 = new Promise((resolve, reject) => reject('拒绝6'))
    let p7 = new Promise((resolve, reject) => reject('拒绝7'))
    let p8 = new Promise((resolve, reject) => reject('拒绝8'))
    let p9 = new Promise((resolve, reject) => setTimeout(() => resolve('9'), 1000))
    let p10 = new Promise((resolve, reject) => setTimeout(() => resolve('10'), 2000))

    let any1 = MyPromise.any([p6, p7, p8])
    any1.then((v) => console.log(v))
        .catch((e) => console.log(e))

    let any2 = MyPromise.any([p10, p6, p7, p8, p9])
    any2.then((v) => console.log(v))
        .catch((e) => console.log(e))
}