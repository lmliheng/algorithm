/**
 * @子数组的最小值之和
 */
function sumSubarrayMins(arr) {
    arr.push(-Infinity);
    let n = arr.length;
    let min = Array.from({ length: n }, () => 0);
    let stack = [];
    let res = 0;
    let MOD = 1000000007;
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[i] <= arr[stack[stack.length - 1]]) {
            let cur = stack.pop();
            res = (res + (cur - min[cur]) * (i - cur) * arr[cur]) % MOD;
        }
        min[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(i);
    }
    return res;
}
;
export {};
