"""
@difficulty easy
@tags dp,数组
@time O(n)
@space O(n)
@note 一维 dp，每步取前一级或前两级的最小花费
"""
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        dp = [0] * (n+1)
        for i in range(2,n+1):
            dp[i]=min(dp[i-1]+cost[i-1],dp[i-2]+cost[i-2])
        print(dp)
        return dp[n]
