/**
 * @变换二进制字符串的最少操作次数
 * @ai写的
 */

let s1 = "01"
let s2 = "10"
const n = s1.length;
let ops = 0;
let pending = 0; // 待处理的1的数量（需要变为0）

for (let i = 0; i < n; i++) {
    if (s1[i] === '1' && s2[i] === '0') {
        pending++; // 需要把这个1变成0
    } else if (s1[i] === '0' && s2[i] === '1') {
        if (pending > 0) {
            pending--; // 用之前多出的1来配对
            ops++; // 一次操作2解决两个问题
        } else {
            ops++; // 需要用操作1
        }
    }
    // 其他情况不需要操作
}

// return pending === 0 ? ops : -1;

console.log(pending, ops)