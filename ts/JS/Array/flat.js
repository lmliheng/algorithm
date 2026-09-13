// 嵌套数组扁平化
let arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

console.log(arr.flat(5))
console.log(arr.flat(1))
console.log(arr.flat(2))


// 原理实现