"""
@lc 42
@title 接雨水
@difficulty hard
@tags 数组,双指针
@time O(n)
@space O(1)
@note 按最高点把数组分成左右两段，各自维护本侧最大值累加差值
"""

class Solution:
    def trap(self, height: List[int]) -> int:
        res=0
        max_height = max(height)
        max_height_index = height.index(max_height)
        left_max_height=0
        right_max_height=0
        for i in range(max_height_index+1):
            if height[i]>left_max_height:
                left_max_height=height[i]
            else:
                res+=left_max_height-height[i]

        for i in range(len(height)-1, max_height_index-1 , -1):
            if height[i]>right_max_height:
                right_max_height=height[i]
            else:
                res+=right_max_height-height[i]

        return res
