package 最小的子序列II.src.main;

import java.util.HashMap;

public class Solution {
    public int distinctSubseqII(String s) {

        /*
         * 思路：动态规划
         * 状态转移方程：dp[i] = dp[i - 1] * 2 - dp[lastSeen[s[i - 1]] - 1]
         * dp[i] 表示以 s[i - 1] 为结尾的子序列数量
         * dp[i - 1] * 2 表示不考虑当前字符的情况
         * -dp[lastSeen[s[i - 1]] - 1] 表示减去重复的部分
         */
        final int MOD = 1_000_000_07;
        int n = s.length();

        long[] dp = new long[n + 1];
        dp[0] = 1;  // 空字符串的子序列数量为1

        HashMap<Character, Integer> lastSeen = new HashMap<>();

        for (int i = 1; i <= n; i++) {
            char c = s.charAt(i - 1);
            dp[i] = (dp[i - 1] * 2) % MOD;  // 不考虑当前字符的情况

            if (lastSeen.containsKey(c)) {
                dp[i] = (dp[i] - dp[lastSeen.get(c) - 1] + MOD) % MOD;  // 减去重复的部分
            }

            lastSeen.put(c, i);  // 更新字符c的上次出现位置
        }

        return (int) (dp[n] - 1 + MOD) % MOD;  // 去掉空子序列并确保结果为正
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.distinctSubseqII("pcrdhwdxmqdznbenhwjsenjhvulyve"));  // 输出: 7
        System.out.println(solution.distinctSubseqII("aba"));  // 输出: 6
    }
}