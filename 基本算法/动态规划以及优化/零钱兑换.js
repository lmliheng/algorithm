/**
 * @零钱兑换
 * 
 * 使用dp[i]:凑成i的最少硬币数，dp[1,amount]取最大值，dp长度为amount+1,包含了金额0
 * dp[0]是0，因为金额0不需要钞票就能组成
 * dp[1]，遍历coin，coin[j]小于1的，dp[i-coin[j]]+1和dp[i]取较小值，dp[i-coin[j]]+1含义是：减去这个金额后取dp再加1
 * 后面同理
 * 
 */

function coinChange(coins, amount) {
    if (amount === 0) { return 0 }
    coins.sort((a, b) => a - b)
    console.log(coins)
    // dp[i]:凑成i的最少硬币数
    let dp = Array.from({ length: amount + 1 }, () => amount + 1)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
            } else {
                break
            }
        }
    }
    console.log(dp)
    return dp[amount] === amount + 1 ? -1 : dp[amount]

};

// console.log(coinChange([1, 2, 5], 11))
