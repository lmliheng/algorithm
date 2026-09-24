"""
41. 缺失的第一个正数
"""
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n=len(nums)
        set1=set(nums)
        # [1]的情况
        for i in range(1,n+2):
            if not i in set1:
                return i