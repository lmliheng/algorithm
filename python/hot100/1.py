"""
@difficulty easy
@tags 哈希表,数组
@time O(n)
@space O(n)
@note 边遍历边在哈希表里查补数
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