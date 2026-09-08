"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let matrix = [
    [1, 2, 3, 8],
    [4, 5, 6, 9],
    [7, 8, 9, 10],
];
if (!matrix.length) {
    console.log([]);
}
let l = 0, r = matrix[0].length - 1; // 左、右边界索引
let t = 0, b = matrix.length - 1; // 上、下边界索引
const res = [];
while (true) {
    // 1. 从左到右遍历上边
    for (let i = l; i <= r; i++)
        res.push(matrix[t][i]);
    t++; // 上边界下移
    if (t > b)
        break; // 判断是否越界，越界则遍历完成
    // 2. 从上到下遍历右边
    for (let i = t; i <= b; i++)
        res.push(matrix[i][r]);
    r--; // 右边界左移
    if (l > r)
        break;
    // 3. 从右到左遍历下边
    for (let i = r; i >= l; i--)
        res.push(matrix[b][i]);
    b--; // 下边界上移
    if (t > b)
        break;
    // 4. 从下到上遍历左边
    for (let i = b; i >= t; i--)
        res.push(matrix[i][l]);
    l++; // 左边界右移
    if (l > r)
        break;
}
console.log(res);
