"use strict";
/**
 * @Promise的实现
 *
 * 使用ts完成，有充分的类型推断
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPromise = void 0;
/**
 * @MyPromise
 */
class MyPromise {
    constructor(executor) {
        // 实例字段=construction里写this
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
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
            executor(resolveHandler, rejectHandler);
        }
        catch (_a) {
            rejectHandler();
        }
    }
    /**
     * @then
     *
     * @param onfulfilled
     * @param onrejected
     * @returns
     */
    then(onfulfilled, onrejected) {
        // 处理非函数参数
        onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (value) => value;
        onrejected = typeof onrejected === "function" ? onrejected : (reason) => { throw reason; };
        return new MyPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onfulfilled(this.value);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            };
            const handleRejected = () => {
                try {
                    const result = onrejected(this.reason);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            };
            if (this.state === "fulfilled") {
                handleFulfilled();
            }
            else if (this.state === "rejected") {
                handleRejected();
            }
            else {
                this.resolveCallbacks.push(handleFulfilled);
                this.rejectCallbacks.push(handleRejected);
            }
        });
    }
    /**
     *
     * @catch
     */
    catch(onrejected) {
        return new MyPromise((resolve, reject) => {
            const handleRejected = () => {
                try {
                    const result = onrejected(this.reason);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            };
            if (this.state === "rejected") {
                handleRejected();
            }
        });
    }
    /**
     * @静态方法resolve
     *
     * value值什么都能传，非Promise返回Promise，Promise返回，thenable对象返回...
     *
     * 没有写thenable的情况
     */
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve) => {
            resolve(value);
        });
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
            return new Promise(() => { });
        }
        let n = promiseArray.length;
        return new Promise((resolve, reject) => {
            let settled = false;
            let rejectCount = 0;
            let errors = [];
            for (let i = 0; i < n; i++) {
                Promise.resolve(promiseArray[i]).then((value) => {
                    if (!settled) {
                        settled = true;
                        resolve(value);
                    }
                }, (e) => {
                    if (!settled) {
                        errors[i] = e;
                        rejectCount++;
                        if (rejectCount == n) {
                            const aggregateError = new AggregateError(errors, '所有promise都被拒绝了');
                            reject(aggregateError);
                        }
                    }
                });
            }
        });
    }
}
exports.MyPromise = MyPromise;
