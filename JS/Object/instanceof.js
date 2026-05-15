let num=5
console.log(num instanceof Number)// ts error / js输出false
console.log(new Number(num) instanceof Number)// true


let obj=new Object(5)
console.log(obj) // [Number: 5]