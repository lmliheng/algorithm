/**
 * @修正1358
 * @用数字维护一个滑动窗口
 */

function numberOfSubstrings(s) {
    let pos = [-1, -1, -1];
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        pos[s.charCodeAt(i) - 97] = i;
        ans += Math.min(...pos) + 1;
    }
    return ans;
}