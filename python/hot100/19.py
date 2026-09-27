"""
@difficulty medium
@tags 矩阵,模拟
@time O(n*m)
@space O(1)
@note 四条边界收缩模拟螺旋遍历
54. 螺旋矩阵
"""

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res=[]
        m=len(matrix)
        n=len(matrix[0])
        l=0
        r=n-1
        t=0
        b=m-1
        while l<=r and t<=b:
            for i in range(l,r+1,1):
                res.append(matrix[t][i])
            t+=1
            for i in range(t,b+1,1):
                res.append(matrix[i][r])
            r-=1
            if t <= b:
                for i in range(r,l-1,-1):
                    res.append(matrix[b][i])
                b-=1
            if l<=r:
                for i in range(b,t-1,-1):
                    res.append(matrix[i][l])
                l+=1

        return res