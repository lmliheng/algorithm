/**
 * @最大的以1为边界的正方形
 * 
 *暴力解法
 */

let grid = [[1, 1, 0], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 0]]


/**
 * @暴力解法
 * 可以优化：层序遍历思想选择左上角元素，直接剪枝
 */
export function largest1BorderedSquare1(grid) {
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



/**
 * @构建辅助数组
 * 用left[i][j] 记录该点以下有几个连续1，top[i][j]一样
 * 
 */
export function largest1BorderedSquare2(grid) {
    let res = 0
    let m = grid.length
    let n = grid[0].length

    let left = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let top = new Array(m).fill(0).map(() => new Array(n).fill(0))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let leftNum = 0
            let topNum = 0
            for (let l = j; l < n; l++) {
                if (grid[i][l] === 0) {
                    break
                }
                leftNum++
            }

            for (let t = i; t < m; t++) {
                if (grid[t][j] === 0) {
                    break
                }
                topNum++
            }

            left[i][j] = leftNum
            top[i][j] = topNum

        }
    }

    console.table(left)
    console.table(top)

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                continue
            }

            let passibleLength = Math.min(left[i][j], top[i][j])

            for (let len = passibleLength; len >= 1; len--) {
                // 右上角点 
                if (top[i][j + len - 1] < len) {
                    continue
                }
                // 左下角点 
                if (left[i + len - 1][j] < len) {
                    continue
                }
                res = Math.max(res, len)
                break
            }

        }
    }
    return res * res

}


export function largest1BorderedSquare3(grid) {
    const m = grid.length, n = grid[0].length;
    const left = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    const up = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    let maxBorder = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (grid[i - 1][j - 1] === 1) {
                left[i][j] = left[i][j - 1] + 1;
                up[i][j] = up[i - 1][j] + 1;
                let border = Math.min(left[i][j], up[i][j]);
                while (left[i - border + 1][j] < border || up[i][j - border + 1] < border) {
                    border--;
                }
                maxBorder = Math.max(maxBorder, border);
            }
        }
    }
    return maxBorder * maxBorder;
}
