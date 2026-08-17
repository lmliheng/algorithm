class Solution:
    def climbStairs(self, n: int, costs: List[int]) -> int:
        dp = [0] * (n + 1)
        if n == 1:
            return dp[0] + costs[0] + 1
        if n == 2:
            dp[1] = dp[0] + costs[0] + 1
            dp[2] = min(dp[0] + costs[1] + 4, dp[1] + costs[1] + 1)
            return dp[2]
        dp[1] = dp[0] + costs[0] + 1
        dp[2] = min(dp[0] + costs[1] + 4, dp[1] + costs[1] + 1)
        for i in range(3, n + 1):
            dp[i] = min(
                dp[i - 1] + costs[i-1] + 1,
                dp[i - 2] + costs[i-1] + 4,
                dp[i - 3] + costs[i-1] + 9,
            )
        print(dp)
        return dp[n]
