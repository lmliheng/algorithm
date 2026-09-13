/**
 * @32. 最长有效括号
 */


function longestValidParentheses(s: string) {
    let max = 0;
    // dp[i]：s[0]...s[i]的字符串 的最长有效子串长度
    const dp = new Array(s.length).fill(0);
    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {

                if (i >= 2) {
                    dp[i] = dp[i - 2] + 2
                } else {
                    dp[i] = 2
                }

                // s[i]和s[i-1]为)，看s[i-dp[i-1]]是否是
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {

                if ((i - dp[i - 1]) >= 2) {
                    dp[i] = dp[i - 1] + dp[i - dp[i - 1] - 2] + 2
                } else {
                    dp[i] = dp[i - 1] + 2
                }

            }
            max = Math.max(max, dp[i]);
        }
    }
    // console.log(dp)
    return max;
};