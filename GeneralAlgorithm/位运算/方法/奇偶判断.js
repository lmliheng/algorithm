let even_1 = 4
let odd_1 = 3

console.log(even_1 & 1, typeof (even_1 & 1)) //0
console.log(odd_1 & 1) //1

const isEven = (n) => (n & 1) === 0 ? true : false
const isOdd = (n) => (n & 1) === 1 ? true : false

console.log(isEven(even_1)) //true
console.log(isOdd(odd_1)) //true