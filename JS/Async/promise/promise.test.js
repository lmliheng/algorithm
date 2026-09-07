import { MyPromise } from './MyPromise.js'

let p = new MyPromise((resolve, reject) => reject('拒绝'))
p.then((value) => console.log(value))
    .catch((e) => console.log(e))


let p1 = MyPromise.resolve('1')
p1.then((value) => console.log(value), (e) => console.log(e))




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


/**
 * 输出b的微任务更先入队
 * adbc
 */
if (process.argv[2] === 'pdd') {
    async function main() {
        try {
            console.log('a')
            Promise.reject('A').catch((reason) => console.log('b'))
            await Promise.reject('B')
        } catch (e) {
            console.log('c')
        }
    }
    main()
    console.log('d')
}
