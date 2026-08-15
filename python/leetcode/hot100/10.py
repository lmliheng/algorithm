"""
和为 K 的子数组
lc 560
"""

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        prefix_sum_count={}
        prefix_sum_count[0]=1
        current_sum = 0
        result = 0
        for num in nums:
            current_sum += num
            
            # 检查是否存在之前的前缀和使得 current_sum - prev_sum = k
            target = current_sum - k
            if target in prefix_sum_count:
                result += prefix_sum_count[target]
            
            # 记录当前前缀和出现的次数
            if current_sum in prefix_sum_count:
                prefix_sum_count[current_sum] += 1
            else:
                prefix_sum_count[current_sum] = 1
        return result