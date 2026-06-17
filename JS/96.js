let n = 3
let dp = new Array(n + 1).fill(0) // 共i个节点的所有搜索二叉树数

dp[0] = 1
dp[1] = 1
// 1，2，dp[2]是2，dp[3]是5
for (let i = 2; i < n + 1; i++) { // i指节点数
    //中的值是j， 左边节点数是j-1,右边是i-j
    for (let j = 1; j <= i; j++) {
        dp[i] += dp[j - 1] * dp[i - j]
    }
}

console.log(dp)
console.log(dp[n])