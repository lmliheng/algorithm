"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 5 / 3;
let b = -7 / 3;
console.log(a);
console.log(Number.isInteger(a));
console.log(b);
console.log(Number.isInteger(b));
let res = Math.floor(-7 / 3);
console.log(res);
if (res < 0 && !Number.isInteger(res)) {
    res = res + 1;
}
console.log(res);
