/**
 * @区域和检索_数组不可变
 * 前缀和应用
 */
function NumArray(nums) {
    this.array = nums
    this.prefixSum = new Array(nums.length + 1).fill(0)
    for (let i = 0; i < nums.length; i++) {
        this.prefixSum[i + 1] = this.prefixSum[i] + nums[i]
    }
};

NumArray.prototype.sumRange = function (left, right) {
    return this.prefixSum[right + 1] - this.prefixSum[left]
};