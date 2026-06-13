let original = [1, 2, 3, 4]
let m = 4
let n = 1
if (!(original.length === m * n)) { return [] }
let res = new Array(m)
for (let i = 0; i < m; i++) {
    res[i] = new Array(n)
    for (let j = 0; j < n; j++) {
        console.log(original[i*n+j])
        res[i][j]=original[i*n+j]
    }
}

console.log(res)