// 2-根号n

let a=23

let isPrime=false
for(let i=2;i*i<=a;i++){
    if(a%i==0){
        isPrime=true
        break
    }
}


console.log(isPrime?"不是质数":"是质数")
