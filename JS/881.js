let people = [3, 2, 2, 1]
let limit = 3
let res = 0
people.sort((a, b) => a - b) // 1 2 2 3
let n = people.length
let l = 0 // 轻
let r = n - 1
while (l < r) {
    if (limit - people[l] >= people[r]) {
        l++

    }
    r--
    res++
}
if (l === r) { res++ }
console.log(res)