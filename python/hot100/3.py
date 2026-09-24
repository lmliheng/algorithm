"""
最长连续序列
lc 128
"""
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if len(nums)==0:
            return 0

        nums.sort()
        print(nums)
        maxLen=1
        res=0
        for index,num in enumerate(nums):
            if index==0:
                continue
            if nums[index-1]==num-1:
                maxLen+=1
            elif nums[index-1]==num:
                continue
            else:
                res=max(res,maxLen)
                maxLen=1
        res=max(res,maxLen)
        return res
