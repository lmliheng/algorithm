/**
 * @map方法
 */

let arr = [1, 3, 5, 6, 8]
console.log(arr.map(item => item + 1))


/**
 * @myMap
 * @param {*} callback 
 * @param {*} thisArg 
 * @returns 
 */

Array.prototype.myMap = function (callback, thisArg) {
    // 检查调用者是否为数组
    if (this == null) {
        throw new TypeError('Array.prototype.myMap called on null or undefined');
    }
    // 检查 callback 是否为函数
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const len = this.length
    const A = new Array(len);               // 创建结果数组

    for (let k = 0; k < len; k++) {
        // 检查索引 k 是否存在于数组中（处理稀疏数组）
        if (k in this) {
            const kValue = this[k];
            // 调用 callback，传入三个参数：当前元素、索引、原数组。不理解
            A[k] = callback.call(thisArg, kValue, k, O);
        }
    }

    return A;
};