/**
 * @difficulty medium
 * @tags 数学,数组
 * @time O(n*log(log n))
 * @space O(n)
 * @note 埃氏筛，从 i*i 起标记合数
 * @204. 计数质数
 */
function countPrimes(n: number): number {
    if (n <= 2) return 0
    let isPrime = new Array(n).fill(true)
    isPrime[0] = false
    isPrime[1] = false
    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false
            }
        }
    }
    let count = 0
    for (let i = 2; i < n; i++) {
        if (isPrime[i]) count++
    }
    return count
}
