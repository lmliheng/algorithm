"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
let set = new Set();
let row = matrix.length;
let col = matrix[0].length;
const removeRowCol = (x, y) => {
    // col
    for (let i = 0; i < row; i++) {
        matrix[i][y] = 0;
    }
    //row
    for (let i = 0; i < col; i++) {
        matrix[x][i] = 0;
    }
};
for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        if (matrix[i][j] === 0) {
            set.add(`${i},${j}`);
        }
    }
}
for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        if (set.has(`${i},${j}`)) {
            removeRowCol(i, j);
        }
    }
}
console.log(matrix);
