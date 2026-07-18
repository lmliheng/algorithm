/**
 * @交替数列的最大元素
 */
let n=3
let m=7
let s=7
if (m === 1 && n !== 1) {
    return s + 1;
}
if (n === 1) {
    return s;
}
if (n === 2 && n === 3) {
    return s + m;
}

console.log(s + Math.ceil((n - 1) / 2) * m - Math.floor((n - 2) / 2))