"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let points = [[1, 9], [7, 16], [12, 17]];
// error : [[1,9],[7,16],[2,5],[7,12],[9,11],[2,10],[9,16],[3,9],[1,3]]
points.sort((a, b) => a[0] - b[0]);
console.log(points);
let num = 1; //用于记录相同区间的res索引
let space = [...points[0]];
for (let i = 1; i < points.length; i++) {
    console.log(space);
    // 有公共区间
    if (points[i][0] <= space[1]) {
        space[0] = points[i][0];
        space[1] = Math.min(points[i][1], points[i - 1][1]);
    }
    else {
        num++;
        space[0] = points[i][0];
        space[1] = points[i][1];
    }
}
console.log(num);
