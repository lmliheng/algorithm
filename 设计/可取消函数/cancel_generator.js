/**
 * @可取消执行的函数
 * 入参是generator，不像Promise只要运行无法中止
 * 力扣2650
 */

var cancellable = function (generator) {
    // [1]一个 取消函数 和一个 promise 对象
    let cancel, promise

    promise = new Promise(async (resolve, reject) => {
        cancel = async () => {
            // [5]调用了取消回调函数
            try {
                // [6]应该将错误抛回给生成器。该错误应该是字符串 "Cancelled"
                let p = generator.throw('Cancelled')
                // [7]如果错误被捕获...应该解析为下一个生成或返回的值
                resolve(await p.value)
            } catch (e) {
                // [8]否则...应该被拒绝并抛出该错误
                reject(e)
            }
        }

        try {
            let p = generator.next()
            while (!p.done) {
                try {
                    // [2]生成器函数只会生成 promise 对象
                    let v = await p.value

                    // [3]将 promise 对象解析的值传回生成器
                    p = generator.next(v)
                } catch (e) {
                    // [4]如果 promise 被拒绝...应将该错误抛回给生成器
                    p = generator.throw(e)
                }
            }
            // [9]当生成器完成时...应该解析为生成器返回的值
            resolve(await p.value)
        } catch (e) {
            // [10]如果生成器抛出错误...应该拒绝并抛出该错误
            reject(e)
        }
    })
    return [cancel, promise]
};

// 作者：qszhu
// 链接：https://leetcode.cn/problems/design-cancellable-function/solutions/2248678/an-ti-mu-miao-shu-zhu-ju-wu-nao-shi-xian-d8fe/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。