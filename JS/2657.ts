let A = [1, 3, 2, 4]
let B = [3, 1, 2, 4]

let set = new Set()
let res = []
for (let i = 0; i < B.length; i++) {
    set.add(A[i])
    let num = 0
    for (let j = 0; j <= i; j++) {
        if (set.has(B[j])) {
            num++
        }
    }
    res.push(num)
    console.log(num)
    
}
console.log(res)