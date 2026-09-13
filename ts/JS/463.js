let grid = [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0]]
let res = 0
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 1) {
            console.log(i, j, 'res=', res)
            res += 4
            if (i > 0 && grid[i - 1][j] === 1) { res -= 2 }
            if (j > 0 && grid[i][j - 1] === 1) { res -= 2 }
        }
    
    }
}
console.log(res)