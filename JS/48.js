"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let matrix = [[2, 29, 20, 26, 16, 28], [12, 27, 9, 25, 13, 21], [32, 33, 32, 2, 28, 14], [13, 14, 32, 27, 22, 26], [33, 1, 20, 7, 21, 7], [4, 24, 1, 6, 32, 34]];
//00=>0n  01=>1n  02=>2n
//10=>0(n-1)  
let map = new Map();
let n = matrix.length;
for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
        // 00-20 01-10 02-00
        map.set(`${row},${col}`, matrix[n - col - 1][row]);
    }
}
console.log(map);
for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
        matrix[row][col] = map.get(`${row},${col}`);
    }
}
console.log(matrix);
