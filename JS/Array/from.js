
/**
 * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
 */
let a = Array.from({ length: n + 1 }, () => false);
console.log(a)

console.log(Array.from("foo"));
console.log(Array.from([1, 2, 3], (x) => x + x));