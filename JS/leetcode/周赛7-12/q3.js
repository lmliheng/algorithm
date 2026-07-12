/**
 * @创建一个恰好有K条路径的网格图
 * 
 * 当m>=4 n>=4
 */

let m = 4
let n = 4
let k = 4
// C24 C36 // c52

// 构造
let grid = new Array(m).fill('#').map(() => '#'.repeat(n))
if (k === 1) {
    for (let i = 0; i < m; i++) {
        grid[i] = '.' + '#'.repeat(n - 1)
    }
    grid[m - 1] = '.'.repeat(n)
} else if (k === 2) {
    for (let i = 0; i < m; i++) {
        grid[i] = '.' + '#'.repeat(n - 2) + '.'
    }
    grid[0] = '.'.repeat(n)
    grid[m - 1] = '.'.repeat(n)

} else if (k === 3) {
    for (let i = 0; i < m; i++) {
        grid[i] = '.' + '#'.repeat(n - 2) + '.'
    }
    grid[0] = '.'.repeat(n)
    grid[m - 1] = '.'.repeat(n)
    grid[1] = '.' + '#'.repeat(n - 3) + '..'

} else if (k === 4) {
    for (let i = 0; i < m; i++) {
        grid[i] = '.' + '#'.repeat(n - 2) + '.'
    }
    grid[0] = '.'.repeat(n)
    grid[m - 1] = '.'.repeat(n)
    grid[1] = '.' + '#'.repeat(n - 3) + '..'
    grid[m - 2] = '..' + '#'.repeat(n - 3) + '.'
}

console.log(grid)
