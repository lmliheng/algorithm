/**
 * @1260. 二维网格迁移
 */

let grid: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let m: number = grid.length
let n: number = grid[0].length
let lastCol: number[] = []
for (let i = 0; i < m; i++) {
    lastCol.push(grid[i].pop()!)
}
lastCol.unshift(lastCol.pop()!)
for (let i = 0; i < m; i++) {
    grid[i].unshift(lastCol[i])
}
console.log(lastCol)
console.log(grid)

export {};
