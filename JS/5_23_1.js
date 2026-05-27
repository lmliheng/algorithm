"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let nums = [0, 29];
let zeroN = 0;
let zeroN1 = 0;
//  记录0的个数
for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
        zeroN++;
    }
}
// 记录已在末尾的0个数
for (let i = nums.length - zeroN; i < nums.length; i++) {
    if (nums[i] === 0) {
        zeroN1++;
    }
}
console.log(zeroN, zeroN1);
