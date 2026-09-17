
/**
 * 
 * @求0-n内(包括n)的所有质数
 */
function SieveMethod(n: number): number[] {
    let isPrime = new Array(n).fill(true)

    let prime = []
    isPrime[0] = false
    isPrime[1] = false

    // 筛选质数的倍数为非质数
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
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

    return prime
}



/**
 * @其他筛法
 */