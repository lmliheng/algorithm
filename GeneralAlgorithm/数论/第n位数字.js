/**
 * @第n位数字
 */
let n = 30

let num = 0
let res = ''
while (res.length < n) {
    num++
    res += num.toString()
}

console.log(res[n-1])