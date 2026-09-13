/**
 * @顺次数
 * 1. 字符串化生成顺次数
 * 2. 
 */
let low = 100
let high = 2346
let res = []
let num_bit = [low.toString().length, high.toString().length]
console.log(num_bit)
const CreateNum = (bit) => {
    let arr = []
    for (let i = 1; i < 11 - bit; i++) {
        let str = ''
        for (let j = 0; j < bit; j++) {
            str += (j + i).toString()
        }
        arr.push(+str)
    }
    return arr
}
console.log(CreateNum(5))
//实际遍历情况比理想遍历要多一点
for (let i = num_bit[0]; i <= num_bit[1]; i++) {
    let Arr = CreateNum(i)
    console.log('Arr:', Arr)
    for (let j = 0; j < Arr.length; j++) {
        if (Arr[j] < low) {
            continue
        } else if (Arr[j] >= low && Arr[j] <= high) {

            res.push(Arr[j])
        } else {
            break
        }
    }
}

console.log(res)
