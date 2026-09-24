"""
无重复字符的最长子串

lc 3
"""

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n=len(s)
        res=0
        left=0
        dict1={}
        for i in range(0,n):
            if s[i] in dict1:
                dict1[s[i]]+=1
            else:
                dict1[s[i]]=1
            while dict1[s[i]]>1:
                dict1[s[left]]-=1
                left+=1
            res=max(res,i-left+1)
        return res
            
            