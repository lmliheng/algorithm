class MyPromise {
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
}

// 测试


// 案例1：基本链式调用
console.log("=== 案例1：基本链式调用 ===");

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
console.log("\n=== 案例2：错误处理 ===");

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
console.log("\n=== 案例3：同步值 ===");

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
console.log("\n=== 案例5：异步链式 ===");

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