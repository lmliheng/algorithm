"""
@lc 73
@title 矩阵置零
@difficulty medium
@tags 矩阵,数组
@time O(z*(m+n))
@space O(z)
@note 先记下所有 0 的位置再逐行逐列置零（z 是 0 的个数）；标准做法能压到 O(m*n)
"""

class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        zero=[]
        m=len(matrix)
        n=len(matrix[0])
        for i in range(0,m):
            for j in range(0,n):
                if matrix[i][j]==0:
                    zero.append([i,j])
        print(zero)
        for i in range(len(zero)):
            for r in range(0,m):
                matrix[r][zero[i][1]]=0
            for c in range(0,n):
                matrix[zero[i][0]][c]=0
        

        
                
        