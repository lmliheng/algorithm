/**
 * @68. 文本左右对齐
 * 某行分配不均时，左边字符串的空格更多...
 */

let words: string[] = ["This", "is", "an", "example", "of", "text", "justification."]
let maxWidth: number = 16

let n: number = words.length
let p1: number = 0
let arr: number[] = [] //放入元素是：每行有几个字符串
let arr_len: number[] = []  // 计算了一个空隙
// 初始化 放第一个字符串进去，标定个数为1
let words_length: number = words[0].length
let words_num: number = 1
while (true) {
    if ((p1 < n - 1) && (words_length + 1 + words[p1 + 1].length) <= maxWidth) {
        p1++
        words_num++
        words_length += (1 + words[p1].length)
    } else {
        arr.push(words_num)
        arr_len.push(words_length)
        p1++
        if (p1 > n - 1) {
            break
        }
        words_length = words[p1].length
        words_num = 1
    }
}

console.log(arr, arr_len)
let res: string[] = []
let p2: number = 0
for (let i = 0; i < arr.length; i++) {
    const isLastLine: boolean = i === arr.length - 1

    if (arr[i] === 1 || isLastLine) {
        // 单个单词或最后一行：左对齐
        let str: string = words[p2]
        for (let j = p2 + 1; j < p2 + arr[i]; j++) {
            str += ' ' + words[j]
        }
        str += ' '.repeat(maxWidth - str.length)
        res.push(str)
    } else {
        // 普通行：均匀分配空格
        let totalSpaces: number = maxWidth - arr_len[i] + (arr[i] - 1) // 总空格数
        let baseSpaces: number = Math.floor(totalSpaces / (arr[i] - 1))
        let extraSpaces: number = totalSpaces % (arr[i] - 1)

        let str: string = words[p2]
        for (let j = p2 + 1; j < p2 + arr[i]; j++) {
            let spaces: number = baseSpaces + (j - p2 <= extraSpaces ? 1 : 0)
            str += ' '.repeat(spaces) + words[j]
        }
        res.push(str)
    }
    p2 += arr[i]
}

console.log(res)

export {};
