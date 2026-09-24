"""
分母异位词分组
lc 49
"""
class Solution:
 def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        if len(strs)==0:
            return [[""]]
        if len(strs)==1:
            return [[f"{strs[0]}"]]
        
        index=0
        s_map={}
        res=[]
        for str in strs:
            new_str=''.join(sorted(str))
            print(new_str)
            if new_str in s_map:
                res[s_map[new_str]].append(str)
            else:
                s_map[new_str]=index
                index+=1
                res.append([str])   
        return res