/**
 * @Promise的实现
 *
 * 使用ts完成，有充分的类型推断
 */
/**
 * @MyPromise
 */
export declare class MyPromise {
    state: string;
    value: undefined;
    reason: undefined;
    resolveCallbacks: Array<Function>;
    rejectCallbacks: Array<Function>;
    constructor(executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void);
    /**
     * @then
     *
     * @param onfulfilled
     * @param onrejected
     * @returns
     */
    then(onfulfilled?: (value: any) => void, onrejected?: (reason: any) => void): MyPromise;
    /**
     *
     * @catch
     */
    catch(onrejected: (reason?: any) => void): MyPromise;
    /**
     * @静态方法resolve
     *
     * value值什么都能传，非Promise返回Promise，Promise返回，thenable对象返回...
     *
     * 没有写thenable的情况
     */
    static resolve(value: any): MyPromise;
    /**
     *
     * @静态方法any
     * 等catch写好后再把Promise换成MyPromise
     *
     * an方法内容参考promise.js文件
     */
    static any<T>(promiseArray: Array<MyPromise> | Array<Promise<T>>): Promise<unknown>;
}
