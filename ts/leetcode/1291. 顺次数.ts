/**
 * @1291. 顺次数
 */

/**
 * @顺次数
 * 1. 字符串化生成顺次数
 * 2.
 */
let low: number = 100
let high: number = 2346
let res: number[] = []
let num_bit: number[] = [low.toString().length, high.toString().length]
console.log(num_bit)
const CreateNum = (bit: number): number[] => {
    let arr: number[] = []
    for (let i = 1; i < 11 - bit; i++) {
        let str: string = ''
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
    let Arr: number[] = CreateNum(i)
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

export {};
