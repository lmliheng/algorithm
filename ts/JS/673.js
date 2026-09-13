
/**
 * @最长子序列的个数
 * 换个思路
 */

let nums = [1, 3, 5, 4, 7]
let n = nums.length
if (n <= 1) {
    return n
}
let max = 0
let res = 0
// dp1[i]表示最长递增子序列的长度，dp2[i]表示dp1[i]长度子序列的个数
let dp1 = new Array(n).fill(0)
let dp2 = new Array(n).fill(0)
for (let i = 0; i < n; i++) {
    dp1[i] = 1
    dp2[i] = 1
    for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
            if (dp1[j] + 1 > dp1[i]) {
                dp1[i] = dp1[j] + 1
                dp2[i] = dp2[j]
            }

            else if (dp1[j] + 1 === dp1[i]) {
                dp2[i] += dp2[j]
            }
        }

    }
    if (dp1[i] > max) {
        max = dp1[i]
        res = dp2[i]
    } else if (dp1[i] === max) {
        res += dp2[i]
    }

}
console.log(res)
