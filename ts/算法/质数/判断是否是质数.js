// 2-根号n



function isPrime(num) {
    let isPrime = false
    for (let i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            isPrime = true
            break
        }
    }
    return isPrime
}

console.log(isPrime(23) ? "不是质数" : "是质数")
