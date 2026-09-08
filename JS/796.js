"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let s = "abcde";
s = s + s.slice(0, 1);
s = s.replace(s[0], "");
console.log(s);
