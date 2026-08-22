"""
旋转图像

原地旋转,元素可能重复，不要使用map


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

