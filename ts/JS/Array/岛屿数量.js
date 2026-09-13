/**
 * @岛屿数量
 * 
 * 矩阵DFS
 */
function numIslands(grid) {
    let res = 0
    let m = grid.length
    let n = grid[0].length

    let visited = Array.from({ length: m }, () => Array.from({ length: n }, () => false))

    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j] || grid[i][j] === '0') {
            return
        }
        visited[i][j] = true
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j - 1)
        dfs(i, j + 1)

    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == '1' && !visited[i][j]) {
                res++
                dfs(i, j)
            }
        }
    }
    return res

};