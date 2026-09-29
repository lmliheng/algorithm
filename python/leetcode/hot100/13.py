"""
@lc 53
@title 最大子数组和
@difficulty medium
@tags dp,数组,子数组
@time O(n)
@space O(n)
@note 一维 dp：dp[i]=max(dp[i-1]+nums[i], nums[i])，空间可以再压到 O(1)
"""

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [0] * n
        dp[0] = nums[0]
        for i in range(1, n):
            dp[i] = max(dp[i - 1] + nums[i], nums[i])
        return max(dp)
