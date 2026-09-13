/**
 * @腐烂的橘子
 * 
 * 
 * 矩阵BFS
 * 
 * 存在无法腐烂的新鲜橘子 需要注意，根据conut 新鲜橘子数量来判断
 * 每一次BFS的层序遍历 都是一分钟
 * 
 */

function orangesRotting(grid){
    let m = grid.length
    let n = grid[0].length
    let res = 0
    let queue = []
    let count = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                count++
            } else if (grid[i][j] == 2) {
                queue.push([i, j])
            }

        }
    }
    // console.log(count,queue)

    // BFS
    while (count > 0 && queue.length !== 0) {
        res++
        let len = queue.length
        console.log(queue)
        for (let i = 0; i < len; i++) {
            let [r, c] = queue.shift()
            if (r - 1 >= 0 && grid[r - 1][c] == 1) {
                grid[r - 1][c] = 2
                count--
                queue.push([r - 1, c])
            }
            if (r + 1 < m && grid[r + 1][c] == 1) {
                grid[r + 1][c] = 2
                count--
                queue.push([r + 1, c])
            }
            if (c - 1 >= 0 && grid[r][c - 1] == 1) {
                grid[r][c - 1] = 2
                count--
                queue.push([r, c - 1])
            }
            if (c + 1 < n && grid[r][c + 1] == 1) {
                grid[r][c + 1] = 2
                count--
                queue.push([r, c + 1])
            }
        }
    }

    return count == 0 ? res : -1


};