/**
 * @36. 有效的数独
 */
function isValidSudoku(board: string[][]): boolean {
    let row = board[0].length
    let col = board.length
    // row
    for (let i = 0; i < row; i++) {
        let row_set = new Set()
        for (let j = 0; j < col; j++) {
            if (board[i][j] === '.') {
                continue
            }
            if (!row_set.has(board[i][j])) {
                row_set.add(board[i][j])
            } else {
                return false
            }

        }

    }

    // col
    for (let i = 0; i < col; i++) {
        let col_set = new Set()
        for (let j = 0; j < row; j++) {
            if (board[j][i] === '.') {
                continue
            }
            if (!col_set.has(board[j][i])) {
                col_set.add(board[j][i])
            } else {
                return false
            }

        }

    }



    // 3*3
    let arr = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]]
    for (let i = 0; i < arr.length; i++) {
        //arr[i]
        let set = new Set()
        for (let m = arr[i][0]; m < arr[i][0] + 3; m++) {
            for (let n = arr[i][1]; n < arr[i][1] + 3; n++) {
                if (board[m][n] === '.') {
                    continue
                }
                if (!set.has(board[m][n])) {
                    set.add(board[m][n])
                } else {
                    return false
                }


            }
        }
    }

    return true

};