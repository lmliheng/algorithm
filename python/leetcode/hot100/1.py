"""
两数之和
lc 1
"""
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        nums_map={}
        for index,num in enumerate(nums):
            deleteNum=target-num
            if deleteNum in nums_map:
                return [index,nums.index(deleteNum)]
            else:
                nums_map[num]=index