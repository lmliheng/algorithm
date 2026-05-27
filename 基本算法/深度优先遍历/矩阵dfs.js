let grid = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '1', '0']
]


let res = 0
let m = grid.length
let n = grid[0].length
console.log(m,n)
const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) {
        return
    }

    if(grid[i][j]!=='1'){
        return
    }
    console.log('成功遍历的节点：',i,j)
    grid[i][j] = '2'
    dfs(i + 1, j)
    dfs(i, j + 1)
    dfs(i + 1, j + 1)

}

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] === '1') {
            dfs(i, j)
            console.log('dfs起点',i,j)
            res++

        }
    }
}

console.log(res)
console.log(grid)

