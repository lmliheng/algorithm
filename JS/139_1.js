"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let s = "catsanddog";
let wordDict = ["cats", "dog", "sand", "and", "cat"];
let set = new Set(wordDict);
let n = s.length;
let dp = new Array(n + 1).fill(false);
dp[0] = true;
for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
        if (dp[j] && set.has(s.substr(j, i - j))) {
            dp[i] = true;
            break;
        }
    }
}
console.log(dp);
