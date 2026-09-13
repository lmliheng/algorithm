/**
 * @总价值可以被K整除的岛屿数目
 * 参考同目录下的矩阵DFS.js
 * 
 */
export function countIslands(grid, k) {
    let res = 0
    let m = grid.length
    let n = grid[0].length
    let visit = Array.from({ length: m }, () => Array.from({ length: n }, () => false))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let num = 0
            const dfs = (x, y) => {
                if (x < 0 || x >= m || y < 0 || y >= n || visit[x][y] == true || grid[x][y] === 0) {
                    return
                }
                visit[x][y] = true

                num += grid[x][y]
                dfs(x + 1, y)
                dfs(x - 1, y)
                dfs(x, y + 1)
                dfs(x, y - 1)
            }
            if (grid[i][j] !== 0 && visit[i][j] == false) {
                dfs(i, j)
                console.log(i, j, num)
                res += (num % k == 0 ? 1 : 0)
            }

        }
    }
    return res
};