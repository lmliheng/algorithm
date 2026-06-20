// 数组求和

// reduce :reduce每次迭代都会创建新的函数作用域和执行上下文

// reduce 方式
function sumWithReduce(arr) {
    return arr.reduce((acc, cur) => acc + cur, 0);
}

// for 循环方式
function sumWithFor(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}