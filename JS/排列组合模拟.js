"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr = [1, 2, 3, 4, 5, 6];
// 回溯
function permute(arr) {
    const res = [];
    function backtrack(path, used) {
        if (path.length === arr.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (used[i])
                continue;
            used[i] = true;
            path.push(arr[i]);
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    backtrack([], []);
    return res;
}
console.log(permute([1, 2, 3, 4]));
