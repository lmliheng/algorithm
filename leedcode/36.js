
// error
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            console.log('外部运行i:', i, 'j:', j)
            if (board[i][j] == '.') {
                continue
            }

            // row
            for (let k = 0; k < 9; k++) {
                if (k == j) {
                    continue
                }
                if (board[i][k] == board[i][j]) {
                    console.log("检查行重复", i, k, j)
                    return false
                }
            }

            // col
            for (let k = 0; k < 9; k++) {
                if (k == i) {
                    continue
                }
                if (board[k][j] == board[i][j]) {
                    console.log("检查列重复", k, j, i)
                    return false
                }
            }


            // 3*3 box
            if ((i / 3 == 0 || i / 3 == 1 || i / 3 == 2) && (j / 3 == 0 || j / 3 == 1 || j / 3 == 2)) {

                for (let n = i; n < i + 3; n++) {
                    for (let m = j; m < j + 3; m++) {
                        console.log('内部运行i:', n, 'j:', m)
                        if (n == i && m == j) {
                            continue
                        }
                        if (board[i][j] == board[n][m]) {
                            console.log("检查3*3重复", i, j, n, m)
                            return false
                        }
                    }
                }
            }


        }

        return true
    }
};

console.log(isValidSudoku([[".", ".", "4", ".", ".", ".", "6", "3", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], ["5", ".", ".", ".", ".", ".", ".", "9", "."], [".", ".", ".", "5", "6", ".", ".", ".", "."], ["4", ".", "3", ".", ".", ".", ".", ".", "1"], [".", ".", ".", "7", ".", ".", ".", ".", "."], [".", ".", ".", "5", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."]]))
