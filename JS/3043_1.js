"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr1 = [1, 10, 100];
let arr2 = [1000];
const seen = new Set();
for (let num of arr1) {
    while (num > 0) {
        seen.add(num);
        num = Math.floor(num / 10);
    }
}
let best = 0;
for (let num of arr2) {
    while (num > 0) {
        if (seen.has(num)) {
            best = Math.max(best, num);
        }
        num = Math.floor(num / 10);
    }
}
console.log(best === 0 ? 0 : String(best).length);
