"""
合并区间
lc 56
"""
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x:x[0])
        res=[]
        for index,interval in enumerate(intervals):
            if index==0:
                res.append(interval)
            if interval[0]>res[len(res)-1][1]:
                res.append(interval)
            else:
                res[len(res)-1][1]=max(interval[1],res[len(res)-1][1])
        return res

            