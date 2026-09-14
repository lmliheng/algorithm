/**
 * @1967. 作为子字符串出现在单词中的字符串数目
 */

let patterns: string[] = ["a", "abc", "bc", "d"]
let word: string = "abc"
let res: number = 0
for (let i: number = 0; i < patterns.length; i++) {
    if (word.indexOf(patterns[i])!==-1) {
        res++
    }
}

console.log(res)

export {};
