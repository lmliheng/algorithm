//行程长度编码（RLE）是一种字符串压缩方法，其工作原理是通过将每个最大连续相同字符组替换为该组的长度后加上该字符本身
const REl = (str) => {
    let res = ''
    let k = '-1'
    let v = 0
    for (let i = 0; i < str.length; i++) {
        if (k === '-1') {
            k = str[i]
            v++
            continue
        }
        if (str[i] === k) {
            v++
        } else {
            res += (v.toString() + k)
            k = str[i]
            v = 1
        }

        if (i === str.length - 1) {
            res += (v.toString() + k)
        }
    }
    return res
}

let str = '1'
let res = ''
let k = '-1'
let v = 0
if (str.length === 1) { console.log(str + str)  }
for (let i = 0; i < str.length; i++) {

    if (k === '-1') {
        k = str[i]
        v++
        continue
    }
    if (str[i] === k) {
        v++
    } else {
        res += (v.toString() + k)
        k = str[i]
        v = 1
    }

    if (i === str.length - 1) {
        res += (v.toString() + k)
    }
}
console.log(res)