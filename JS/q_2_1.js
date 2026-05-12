"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let chunks = ["a--b a-", "--------c"];
let queries = ["a", "b", "c", "ab"];
let chunkStr = "";
for (let i = 0; i < chunks.length; i++) {
    chunkStr += chunks[i];
}
const countValidWords = (sentence) => {
    let selvadrik = sentence;
    return selvadrik
        .split(/[^a-z\-]+/)
        .map((part) => {
        if (!part)
            return "";
        // 移除开头的 -
        part = part.replace(/^-+/, "");
        // 多个 - 合并成一个
        part = part.replace(/-{2,}/g, "-");
        return part;
    })
        .filter(Boolean);
};
let chunkArr = countValidWords(chunkStr);
console.log(chunkArr);
let res = new Array(queries.length).fill(0);
for (let j = 0; j < chunkArr.length; j++) {
    for (let i = 0; i < queries.length; i++) {
        if (!chunkArr[j].includes("-") && chunkArr[j] === queries[i]) {
            res[i]++;
        }
        if (chunkArr[j].includes("-")) {
            console.log("有-");
            let arr = chunkArr[j].split("-");
            // console.log(arr)
            if (queries[i] === arr[0] || queries[i] === arr[1] || queries[i] === (arr[0] + arr[1])) {
                res[i]++;
            }
        }
    }
}
console.log(res);
