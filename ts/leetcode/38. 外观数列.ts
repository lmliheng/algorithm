/**
 * @38. 外观数列
 * 字符串压缩算法
 */
function countAndSay(n:number) {
    const REl = (str:string) => {
        let res = ''
        let k = '-1'
        let v = 0
        if (str.length === 1) { return str + str }
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
    let rle = '1'
    for (let i = 2; i <= n; i++) {
        console.log(REl(rle))
        rle = REl(rle)

    }
    return rle
};