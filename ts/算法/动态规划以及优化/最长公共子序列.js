/**
 * @最长公共子序列
 * 
 * dp[i][j]表示以  text1[0...i-1]和text2[0...j-1]的最长公共子序列
 * dp[0][j]和dp[i][0]均是0
 * 当text1[i]==text2[j],dp[i][j] = dp[i - 1][j - 1] + 1
 * 否则 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
 */

function longestCommonSubsequence(text1, text2) {
    let l1 = text1.length
    let l2 = text2.length

    let dp = Array.from({ length: l1 + 1 }, () => Array.from({ length: l2 + 1 }, () => 0))

    for (let i = 1; i <= l1; i++) {
        for (let j = 1; j <= l2; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }

        }
    }
    return dp[l1][l2]

};