/**
 * @跳跃游戏2
 */
let nums = [2, 3, 1, 1, 4]
//dp
let n = nums.length
let dp = new Array(n).fill(Infinity)
dp[0] = 0
for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (dp[j] !==-1 && nums[j] >= (i - j)) {
            dp[i] = Math.min(dp[i],dp[j]+1)
        }
    }
}
console.log(dp)