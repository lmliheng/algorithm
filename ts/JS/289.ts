// let board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]
// let board=[[1,1],[1,0]]
let board=[[0]]
let m = board.length
let n = board[0].length
let NewBoard:number[][]  = new Array(m).fill(0).map(() =>  new Array(n).fill(0) )

if(board.length === 1){
    console.log(board)
}

const LiveNumCheck=(num:number, isLive:number)=>{
    if (isLive) {
        if (num === 2 || num === 3) {
            return 1
        } else {
            return 0
        }
    } else {
        if (num === 3) {
            return 1
        } else {
            return 0
        }
    }

}
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        let liveNum = 0
        if (i === 0) {
            if (j === 0) {
                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                if (board[i + 1][j + 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])


            } else if (j === n - 1) {
                if (board[i][j - 1] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                if (board[i + 1][j - 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            } else {
                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i][j - 1] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                if (board[i + 1][j + 1] === 1) { liveNum++ }
                if (board[i + 1][j - 1 ]=== 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            }
        } else if (i === m - 1) {
            if (j === 0) {
                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i - 1][j + 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])


            } else if (j === n - 1) {
                if (board[i][j - 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i - 1][j - 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])
            } else {
                if (board[i][j - 1] === 1) { liveNum++ }
                if (board[i - 1][j - 1] === 1) { liveNum++ }
                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i - 1][j + 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            }

        } else {

            if (j === 0) {

                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                if (board[i - 1][j + 1] === 1) { liveNum++ }
                if (board[i + 1][j + 1] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            } else if (j === n - 1) {

                if (board[i - 1][j - 1] === 1) { liveNum++ }
                if (board[i + 1][j - 1] === 1) { liveNum++ }
                if (board[i][j - 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            } else {
                if (board[i][j + 1] === 1) { liveNum++ }
                if (board[i - 1][j] === 1) { liveNum++ }
                if (board[i + 1][j] === 1) { liveNum++ }
                if (board[i - 1][j + 1] === 1) { liveNum++ }
                if (board[i + 1][j + 1] === 1) { liveNum++ }
                if (board[i - 1][j - 1] === 1) { liveNum++ }
                if (board[i + 1][j - 1] === 1) { liveNum++ }
                if (board[i][j - 1] === 1) { liveNum++ }

                NewBoard[i][j] = LiveNumCheck(liveNum, board[i][j])

            }

        }


    }
}
board = NewBoard

console.log(board)