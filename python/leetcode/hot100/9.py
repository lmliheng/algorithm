"""
438. 找到字符串中所有字母异位词

"""
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
    
        res=[]
        p_len=len(p)
        s_len=len(s)
        if p_len>s_len:
            return []
        win_p=[0]*26
        win=[0]*26
        for i in range(0,p_len):
            win_p[ord(p[i])-97]+=1
            win[ord(s[i])-97]+=1
        if str(win)==str(win_p):
            res.append(0)
        # print(win,win_p,res)
        for i in range(p_len,s_len):
            win[ord(s[i-p_len])-97]-=1
            win[ord(s[i])-97]+=1
            if str(win)==str(win_p):
                res.append(i-p_len+1)
        return res
            

        