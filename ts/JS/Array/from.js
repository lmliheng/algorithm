
/**
 * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
 * 
 * Array.from的第二个参数是映射函数，边构建新数组边转换元素，只遍历一次，接收item、index、arrayLike三个参数，
 * 适用于字符串、Set、Map、arguments、DOM集合等，支持任意返回类型，且需注意this绑定问题。
 */
let n = 10
let a = Array.from({ length: n + 1 }, () => false);
console.log(a)

console.log(Array.from("foo"));//[ 'f', 'o', 'o' ]
console.log(Array.from([1, 2, 3], (x) => x + x));//[ 2, 4, 6 ]
console.log(Array.from(112))

// let twoD = Array.from({ length: 9 }, () => Array(9).fill(0))
let twoD = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
// let twoD=Array(9).fill(0).map(()=>Array(9).fill(0))
console.log(twoD)

let ThreeD = Array.from({ length: 3 }, () => { return Array(3).fill(0).map(() => new Array(3).fill(0)) })
console.log(ThreeD)

let N_arr = Array.from({ length: 10 }, (v, k) => k)//[0,1,2,3]
console.log(N_arr)