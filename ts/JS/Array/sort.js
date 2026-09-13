let str = 'hello world'
let arr = str.split('')
arr.sort()
console.log(arr)


/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
    return arr.sort((a, b) => fn(a) - fn(b))
};
let a = [5, 3, 7, 1]
console.log(sortBy(a, (x) => x))