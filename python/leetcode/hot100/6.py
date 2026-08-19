"""
三数之和
1. 暴力-超时
"""
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        res=[]
        seen = set() 
        n=len(nums)
        if n<3: 
            return []
        nums.sort()
        if nums[0]+nums[1]+nums[2]>0 or nums[n-1]+nums[n-2]+nums[n-3]<0:
            return []
        for i in range(0,n-2):
            for j in range(i+1,n-1):
                target=0-nums[i]-nums[j]
                print( nums[j:n-1])
                if target in nums[j+1:n]:
                    # 唯一标识
                    triplet = tuple(sorted([nums[i], nums[j], target]))
                    if triplet not in seen:
                        seen.add(triplet)
                        res.append([nums[i],nums[j],target])
    
        return res