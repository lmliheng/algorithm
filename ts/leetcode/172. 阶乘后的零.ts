/**
 * @difficulty medium
 * @tags 数学
 * @time O(n)
 * @space O(1)
 * @note 直接算阶乘再数末尾 0，大数会失真
 * @172. 阶乘后的零
 */

let n = 30

let sum = 1
for (let i = 1; i <= n; i++) {
    sum *= i
}
console.log(sum)

let ZeroNum = 0
let sum_str = sum.toString()
for (let i = sum_str.length - 1; i >= 0; i--) {
    if (sum_str[i] === '0') {
        ZeroNum++
    } else {
        break
    }
}

console.log(ZeroNum)
