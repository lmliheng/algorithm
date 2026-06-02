
let grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let m = grid.length
let n = grid[0].length
let lastCol = []
for (let i = 0; i < m; i++) {
    lastCol.push(grid[i].pop())
}
lastCol.unshift(lastCol.pop())
for (let i = 0; i < m; i++) {
    grid[i].unshift(lastCol[i])
}
console.log(lastCol)
console.log(grid)