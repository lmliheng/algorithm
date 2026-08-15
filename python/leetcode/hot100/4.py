"""
移动零
lc 283
"""
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero_num=0
        zero_index=[]
        for i in range(len(nums)-1, -1, -1):
             if nums[i] == 0:
                zero_num += 1
                nums.pop(i)
        nums.extend([0]*zero_num)
        
