/**
 * @子数组的最小值之和
 * 
 * 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。
 * 由于答案可能很大，因此 返回答案模 10^9 + 7 。
 */

function sumSubarrayMins(arr: number[]): number {

    arr.push(-Infinity)
    let n = arr.length
    let min = Array.from({ length: n }, () => 0)
    let stack = []
    let res = 0
    let MOD = 1000000007
    for (let i = 0; i < n; i++) {
        while (stack.length && arr[i] <= arr[stack[stack.length - 1]]) {
            let cur = stack.pop()!
            res = (res + (cur - min[cur]) * (i - cur) * arr[cur]) % MOD
        }
        min[i]=stack.length?stack[stack.length-1]:-1
        stack.push(i)
    }
    return res

};