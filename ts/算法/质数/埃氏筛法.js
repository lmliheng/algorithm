

let n = 5
let isPrime = new Array(n).fill(true)

let prime = []
isPrime[0] = false
isPrime[1] = false

// 筛选质数的倍数为非质数
for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
            console.log(j)
            isPrime[j] = false
        }
    }
}

// 记录
for (let i = 1; i <= n; i++) {
    if (isPrime[i]) {
        prime.push(i)
    }
}

console.log(prime)
