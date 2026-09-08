"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let n = 2;
let set = new Set();
let res = n;
while (true) {
    let str = res.toString();
    res = 0;
    console.log("str=", str);
    for (let i = 0; i < str.length; i++) {
        console.log("str[i]=", str[i]);
        res += (+str[i]) * (+str[i]);
    }
    console.log("res=", res);
    if (res === 1) {
        console.log(true);
        break;
    }
    if (set.has(res)) {
        console.log(false);
        break;
    }
    else {
        set.add(res);
    }
}
