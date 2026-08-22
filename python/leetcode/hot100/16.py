"""
238. 除了自身以外数组的乘积


"""
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n=len(nums)
        res=[1]*n
        for i in range(1,n):
            res[i]=nums[i-1]*res[i-1]
        temp=1
        # 1 1 2 6
        # temp 24 12 4 1
        for i in range(n-1,0,-1):
           
            temp*=nums[i]
            print(i,temp)
            res[i-1]*=temp

        return res

