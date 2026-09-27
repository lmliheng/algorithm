"""
@lc 48
@title 旋转图像
@difficulty medium
@tags 矩阵,原地算法
@time O(n^2)
@space O(1)
@note 先沿主对角线转置，再逐行反转，原地完成
"""
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        n = len(matrix)
    #转置
        for i in range(n):
            for j in range(i):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    #横向倒叙
        for i in range(n):
            matrix[i].reverse()

