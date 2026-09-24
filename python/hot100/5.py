"""
盛最多水的容器
lc 11
题目中heigtht[left]<height[right],必然有
aera(left,right)>aera(left,right-1)
所以left必定要+1
"""
class Solution:
    def maxArea(self, height: List[int]) -> int:
        n = len(height)
        left = 0
        right = n - 1
        res = 0
        res = max(res, min(height[left], height[right]) * (right - left))
        while left<right:
            if height[left]<height[right]:
                left+=1
            else:
                right-=1
            res = max(res, min(height[left], height[right]) * (right - left))
        return res
            
    
