let boxGrid: string[][] =
    [["#","#","*",".","*","."],
            ["#","#","#","*",".","."],
            ["#","#","#",".","#","."]]

// 旋转
let row = boxGrid.length 
let col = boxGrid[0].length

let NewboxGrid: string[][] = []
for (let i = 0; i < col; i++) {
    let arr: string[] = []
    for (let j = row-1; j >= 0; j--) {
        arr.push(boxGrid[j][i])
    }
    NewboxGrid.push(arr)
}

let newRow=col
let newCol=row
console.log("旋转后的网格为",NewboxGrid)
// 掉落

const drop = (x: number, y: number) => {
    for (let i = x + 1; i < newRow; i++) {
        if (NewboxGrid[i][y] === '.') {
            NewboxGrid[i][y] = '#'
            NewboxGrid[i-1][y] = '.'
        }else{
            break
        }
    }

}

for (let i = newRow-1; i >= 0; i--) {
    for (let j = 0; j < newCol; j++) {
        if (NewboxGrid[i][j] === '#') {
            console.log(`进行掉落的坐标为${i},${j}`)
            drop(i, j)
        }

    }
}
console.log(NewboxGrid)
