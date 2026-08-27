/**
 * @单词拆分
 * 
 * 零钱兑换的思路
 */

function wordBreak(s, wordDict) {
    let n = s.length
    let dp = Array.from({ length: n + 1 }, () => false)
    let set = new Set(wordDict)
    dp[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && set.has(s.substring(j, i))) {
                console.log(s.substring(j, i + 1))
                dp[i] = true
                break
            }
        }
    }
    console.log(dp)
    return dp[n]
};