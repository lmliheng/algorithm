/**
 * @37. 解数独
 */
function solveSudoku(board: string[][]): string[][] {
    const rowUsed: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false))
    const colUsed: boolean[][] = Array.from({ length: 9 }, () => new Array(10).fill(false))
    const ThreeUsed: boolean[][][] = Array.from({ length: 3 }, () => 
        Array.from({ length: 3 }, () => new Array(10).fill(false))
    )

    // 初始化已存在的数字
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col]
            if (num !== '.') {
                const numIndex = parseInt(num)
                rowUsed[row][numIndex] = true
                colUsed[col][numIndex] = true
                ThreeUsed[Math.floor(row / 3)][Math.floor(col / 3)][numIndex] = true
            }
        }
    }

    function trackBack(
        board: string[][],
        rowUsed: boolean[][],
        colUsed: boolean[][],
        ThreeUsed: boolean[][][],
        i: number,
        j: number
    ): boolean {
        if (j === 9) {
            j = 0
            i++
            if (i === 9) {
                return true
            }
        }

        if (board[i][j] === '.') {
            for (let num = 1; num <= 9; num++) {
                const canUsed = !(
                    rowUsed[i][num] || 
                    colUsed[j][num] || 
                    ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num]
                )
                
                if (canUsed) {
                    rowUsed[i][num] = true
                    colUsed[j][num] = true
                    ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num] = true
                    board[i][j] = num.toString()

                    if (trackBack(board, rowUsed, colUsed, ThreeUsed, i, j + 1)) {
                        return true
                    }

                    // 回溯
                    board[i][j] = '.'
                    rowUsed[i][num] = false
                    colUsed[j][num] = false
                    ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num] = false
                }
            }
            return false
        } else {
            return trackBack(board, rowUsed, colUsed, ThreeUsed, i, j + 1)
        }
    }

    trackBack(board, rowUsed, colUsed, ThreeUsed, 0, 0)
    return board
}