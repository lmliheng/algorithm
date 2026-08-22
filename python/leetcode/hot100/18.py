"""
矩阵置零
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
        

        
                
        