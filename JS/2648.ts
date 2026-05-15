function* fibGenerator(): Generator<number, any, number> {

    let a = 0
    let b = 1
    while (true) {
        yield a;
        [a,b]=[b,a+b]
        // a=b
        // b=a+b
    }

};
const fib = fibGenerator()
console.log(fib.next().value)// 5
console.log(fib.next().value)// 10
console.log(fib.next().value)// 15
console.log(fib.next().value)// undefined
