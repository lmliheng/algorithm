/**
 * @881. 救生艇
 */

let people: number[] = [3, 2, 2, 1]
let limit: number = 3
let res: number = 0
people.sort((a, b) => a - b) // 1 2 2 3
let n: number = people.length
let l: number = 0 // 轻
let r: number = n - 1
while (l < r) {
    if (limit - people[l] >= people[r]) {
        l++

    }
    r--
    res++
}
if (l === r) { res++ }
console.log(res)

export {};
