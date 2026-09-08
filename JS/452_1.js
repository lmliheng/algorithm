"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let points = [[10, 16], [2, 8], [1, 6], [7, 12]];
points.sort((a, b) => a[1] - b[1]);
console.log(points);
let res = 0;
// 在 for循环中 一边遍历一边 splice，从后往前遍历，避免索引变化导致的错误
// 也要删去0索引的区间
while (points.length > 0) {
    console.log("此时的第一个区间右侧是：", points[0][1]);
    for (let i = points.length - 1; i >= 0; i--) {
        if (points[i][0] <= points[0][1] && points[i][1] >= points[0][1]) {
            console.log("删除", points[i]);
            points.splice(i, 1);
        }
    }
    res++;
}
console.log(res);
