/**
 * @预测赢家
 * 
 */

let nums = [1, 5, 233, 7]

let n = nums.length
//dp[i][j][0]代表先手玩家从索引i到索引j所能获取的最大值
//dp[i][j][1]代表后手玩家从索引i到索引j所能获取的最大值
let dp = Array.from({ length: n }, () => new Array(n).fill(0).map(item => new Array(2).fill(0)))

for (let i = 0; i < n; ++i) {
    dp[i][i][0] = nums[i];
    dp[i][i][1] = 0;
}

console.log(dp)

// 2,3 1,2 1,3 0,1 0,2 0,3
for (let i = n - 2; i >= 0; --i) {

    for (let j = i + 1; j < n; ++j) {

        //先手的最大值是：要么取nums[i]，这个时候当前选手变成了后手，加上后手的最大值是dp[i + 1][j][1]
        //               要么取nums[j]，这个时候当前选手变成了后手，加上后手的最大值是dp[i][j - 1][1]
        dp[i][j][0] = Math.max(nums[i] + dp[i + 1][j][1], nums[j] + dp[i][j - 1][1]);
        //后手只能选最小值，否则会和先手取最大值冲突
        dp[i][j][1] = Math.min(dp[i + 1][j][0], dp[i][j - 1][0]);
    }
}

console.log(dp)
let res = dp[0][n - 1][0] >= dp[0][n - 1][1] ? true : false
console.log(res)