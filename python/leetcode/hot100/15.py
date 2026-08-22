"""
轮转数组

"""
## 超时解法：使用pop弹出右移元素 再insert到nums

class Solution1:
    def rotate(self, nums: list[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n=len(nums)
        k=k%n
        arr=[]
        for i in range(n-k,n):
            arr.append(nums.pop())
        for i in range(0,k):
            nums.insert(0,arr[i])


## 反转法
# 比如[1,2,3,4,5,6],k=10,实际上转k%=6，k=4
# 整体反转[6,5,4,3,2,1]
# 反转前k个,[3,4,5,6,2,1]
# 反转后len-k个,[3,4,5,6,1,2]得到结果

class Solution2:
    def rotate(self, nums: list[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # self.nums = nums
        n = len(nums)
        k %= n
        self.reverse(nums, 0, n - 1)
        self.reverse(nums, 0, k - 1)
        self.reverse(nums, k, n - 1)

    def reverse(self, nums, start, end):
        while start < end:
            temp = nums[start]
            nums[start] = nums[end]
            nums[end] = temp
            start += 1
            end -= 1