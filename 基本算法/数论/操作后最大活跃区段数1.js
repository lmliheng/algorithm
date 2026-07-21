/**
 * @操作后最大活跃区段数1
 * 
 */
let s = s = "0100"

let s1 = s.split('')
let total1 = 0;
let mx = 0;
let pre0 = -Infinity;
let cnt = 0;
for (let i = 0; i < s1.length; i++) {
    cnt++;
    if (i == s1.length - 1 || s1[i] != s1[i + 1]) {
        if (s1[i] == '1') {
            total1 += cnt;
        } else {
            mx = Math.max(mx, pre0 + cnt);
            pre0 = cnt;
        }
        cnt = 0;
    }
}
console.log(total1 + max)