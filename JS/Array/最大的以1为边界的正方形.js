/**
 * @最大的以1为边界的正方形
 * 
 *暴力解法
 */

let grid = [[1, 1, 0], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 0]]

console.table(grid)
/**
 * @暴力解法
 * 可以优化：层序遍历思想选择左上角元素，直接剪枝
 */
export function largest1BorderedSquare(grid) {
    let res = 0
    const m = grid.length
    const n = grid[0].length
    let existOne = false

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) existOne = true

            const maxLen = Math.min(m - i, n - j)

            outer:
            for (let len = maxLen; len >= 1; len--) {
                for (let k = i; k < i + len; k++) {
                    if (grid[k][j] !== 1) continue outer
                }
                for (let k = i; k < i + len; k++) {
                    if (grid[k][j + len - 1] !== 1) continue outer
                }
                for (let k = j; k < j + len; k++) {
                    if (grid[i][k] !== 1) continue outer
                }
                for (let k = j; k < j + len; k++) {
                    if (grid[i + len - 1][k] !== 1) continue outer
                }

                res = Math.max(res, len)
                break
            }
        }
    }

    if (res === 0 && existOne) res = 1
    return res * res
}
