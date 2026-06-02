
let grid = 
 [
 [0,0,1,0,0],
 [0,1,0,1,0],
 [0,1,1,1,0]]
let res = 0
let arr = []
let m = grid.length
let n = grid[0].length
const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) { return }
    if (grid[i][j] !== 0) {
        return
    }
    arr.push([i, j])
    grid[i][j] = 2
    dfs(i - 1, j)
    dfs(i, j + 1)
    dfs(i + 1, j)
    dfs(i, j - 1)
}

const arrFn = () => {
    //console.log(arr)
    let isUpate = true
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === 0 || arr[i][1] === 0 || arr[i][0] === m - 1 || arr[i][1] === n - 1) {
            isUpate = false
        }
    }
    if (isUpate) {
        console.log(arr)
        res += 1
    }
    arr = []
}

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] === 0) {
            dfs(i, j)
            arrFn()
        }
    }
}

console.log(res)
