/**
 * @60. 排列序列
 */

function getPermutation(n: number, k: number) {
    let res = ''
    let num = Array.from({ length: n }, (item, index) => index + 1)
    k--
    for (let i = 0; i < n; i++) {
        let factorial1 = factorial(n - i - 1)
        let index = Math.floor(k / factorial1)
        res += String(num[index])
        num.splice(index, 1)
        k %= factorial1
    }
    return res
};


function factorial(n:number) {
    let num = 1
    for (let i = 1; i <= n; i++) {
        num *= i
    }
    return num
}