/**
 * @解数独
 * 
 */
let board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

let rowUsed = Array.from({ length: 9 }, () => Array(10).fill(0))
let colUsed = Array.from({ length: 9 }, () => Array(10).fill(0))
let ThreeUsed = Array.from({ length: 3 }, () => { return new Array(3).fill(0).map(() => new Array(10).fill(0)) })
// console.log(rowUsed, colUsed, ThreeUsed)

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        let num = board[row][col]
        if (num !== '.') {
            num = (+num)
            rowUsed[row][num] = true;
            colUsed[col][num] = true;
            ThreeUsed[Math.floor(row / 3)][Math.floor(col / 3)][num] = true;
        }
    }

}



function trackBack(board, rowUsed, colUsed, ThreeUsed, i, j) {
    if (j === 9) {
        j = 0
        i++
        if (i === 9) {
            return true
        }
    }

    if (board[i][j] === '.') {
        //填充
        for (let num = 1; num < 10; num++) {
            let canUsed = !(rowUsed[i][num] || colUsed[j][num] || ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num])
            if (canUsed) {
                rowUsed[i][num] = true
                colUsed[j][num] = true
                ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num] = true
                board[i][j] = num.toString()
                // 下一次返回true，这次也是返回true
                if (trackBack(board, rowUsed, colUsed, ThreeUsed, i, j + 1)) {
                    return true
                }
                // 否则
                board[i][j] = '.'
                rowUsed[i][num] = false
                colUsed[j][num] = false
                ThreeUsed[Math.floor(i / 3)][Math.floor(j / 3)][num] = false
            }
        }

    } else {
        // 否则右移一位
        return trackBack(board, rowUsed, colUsed, ThreeUsed, i, j + 1)
    }
    return false
}


trackBack(board, rowUsed, colUsed, ThreeUsed, 0, 0)

console.log(board)