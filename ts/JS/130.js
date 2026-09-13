
let board = [
["X","O","X","X"],
["O","X","O","X"],
["X","O","X","O"],
["O","X","O","X"],
["X","O","X","O"],
["O","X","O","X"]]

let arr = []
let m = board.length
let n = board[0].length
let copyBoard = new Array(m);
for (let i = 0; i < m; i++) {
    copyBoard[i] = new Array(n);
    for (let j = 0; j < n; j++) {
        copyBoard[i][j] = board[i][j];
    }
}

// let copyBoard = new Array(n).fill('').map(() => new Array(m).fill(''))
// for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//         copyBoard[i][j] = board[i][j]
//     }
// }


console.log(m, n)

const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) {
        return
    }

    if (copyBoard[i][j] !== 'O') {
        return
    }
    copyBoard[i][j] = 'M'
    console.log('遍历0：', i, j)
    arr.push([i, j])

    dfs(i + 1, j)
    dfs(i, j + 1)
    dfs(i, j - 1)
    dfs(i - 1, j)

}

const arrFn = () => {
    console.log('arr:', arr)
    let isUpate = true
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === 0 || arr[i][1] === 0 || arr[i][0] === m - 1 || arr[i][1] === n - 1) {
            isUpate = false
        }
    }
    if (isUpate) {
        for (let i = 0; i < arr.length; i++) {
            board[arr[i][0]][arr[i][1]] = 'X'
        }

    }
    arr = []
}


for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (copyBoard[i][j] === 'O') {

            dfs(i, j)
            arrFn()

        }
    }
}

console.log(board)
console.log(copyBoard)