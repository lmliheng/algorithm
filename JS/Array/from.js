
/**
 * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
 */
let n = 10
let a = Array.from({ length: n + 1 }, () => false);
console.log(a)

console.log(Array.from("foo"));//[ 'f', 'o', 'o' ]
console.log(Array.from([1, 2, 3], (x) => x + x));//[ 2, 4, 6 ]

console.log(Array.from(112))