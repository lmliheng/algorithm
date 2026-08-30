/***
 * @下一个排列
 * 难题
 * 
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    const n = nums.length;

    for (let i = n - 1; i >= 1; i--) {
        if (nums[i - 1] < nums[i]) {
            // 将 i 到末尾反转（因为原本是降序）
            reverse(nums, i, n - 1);

            // 在 i 到末尾中找到第一个大于 nums[i-1] 的数并交换
            for (let j = i; j < n; j++) {
                if (nums[j] > nums[i - 1]) {
                    [nums[j], nums[i - 1]] = [nums[i - 1], nums[j]];
                    break;
                }
            }
            return;
        }

        if (i === 1) {
            reverse(nums, 0, n - 1);
        }
    }
};

// 原地反转数组的辅助函数
function reverse(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}