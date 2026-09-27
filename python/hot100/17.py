"""
@difficulty hard
@tags 数组,哈希表
@time O(n)
@space O(n)
@note 集合去重后从 1 起找第一个缺失的正数
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