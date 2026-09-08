"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr = [1, 2, 3, 4, 5];
let size = 3;
let res = [];
for (let i = 0; i < arr.length; i += size) {
    if (arr.slice(i, i + size).length === size) {
        res.push(arr.slice(i, i + size));
    }
    else {
        // console.log("不等",i)
        res.push(arr.slice(i));
    }
}
console.log(res);
