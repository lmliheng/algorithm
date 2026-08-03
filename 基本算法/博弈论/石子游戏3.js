/**
 * @石子游戏3
 * 
 * 不能只贪心眼前的3块，必须考虑对手后续最优收益（DP / Minimax）
 * 所以思路是错误的
 */
let values = [1, 2, 3, 7, 1, 2, 5, -4, 1, -4. - 2]
//存储每次取石子的总数
let arr1 = []
let arr2 = []
let res1 = 0
let res2 = 0

let flag = 1
while (values.length) {
    // 不能这么做：
    //     let num = 0
    //     let sum = 0
    //     for (let i = 0; i < 3 && i < values.length; i++) {
    //         let rawSum=sum // 记录上次sum
    //         sum+=arr[i]
    //         if(rawSum>sum){

    //         }
    //   }
    if (values.length >= 3) {
        let map = new Map([[values[0], 1], [values[0] + values[1], 2], [values[0] + values[1] + values[2], 3]])
        let max = Math.max(values[0], values[0] + values[1], values[0] + values[1] + values[2])
        let ChooseNum = map.get(max)
        if (flag === 1) {
            arr1.push(max)
            res1 += max
            flag = 2
        } else {
            arr2.push(max)
            res2 += max
            flag = 1
        }
        values = values.slice(ChooseNum)
    } else {
        break
    }

}

console.log(arr1, arr2)
console.log(res1, res2)

