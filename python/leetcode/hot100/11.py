"""
滑动窗口最大值
lc 239
"""

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n=len(nums)
        dequene = []
        res = []
        for i in range(0,n):
            if len(dequene)>0 and dequene[0]<i-k+1:
                dequene.pop(0)
            while len(dequene)>0 and nums[dequene[len(dequene)-1]]<nums[i]:
                dequene.pop()
            dequene.append(i)
            if i>=k-1:
                res.append(nums[dequene[0]])
        return res


