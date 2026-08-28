
/**
 * @reduce
 *  数组求和
 */

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