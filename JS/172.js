"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let n = 30;
let sum = 1;
for (let i = 1; i <= n; i++) {
    sum *= i;
}
console.log(sum);
let ZeroNum = 0;
let sum_str = sum.toString();
for (let i = sum_str.length - 1; i >= 0; i--) {
    if (sum_str[i] === '0') {
        ZeroNum++;
    }
    else {
        break;
    }
}
console.log(ZeroNum);
