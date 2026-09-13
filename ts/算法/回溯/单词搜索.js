/**
 * @单词搜索
 * 
 */

var exist = function (board, word) {
    let m = board.length
    let n = board[0].length
    let dirction = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let visit = new Array(m).fill(false).map(() => new Array(n).fill(false))

    const dfs = (x, y, index) => {
        if (index === word.length) {
            return true
        }

        visit[x][y] = true

        for (const [u, v] of dirction) {
            let nx = x + u
            let ny = y + v

            if (
                nx >= 0 && ny >= 0 &&
                nx < m && ny < n &&
                !visit[nx][ny] &&
                board[nx][ny] === word[index]
            ) {
                if (dfs(nx, ny, index + 1)) {
                    return true
                }
            }
        }

        visit[x][y] = false
        return false
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0]) {
                if (dfs(i, j, 1)) {
                    return true
                }
            }
        }
    }
    return false
}