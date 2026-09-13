/**
 * @31. 下一个排列
 */
function nextPermutation(nums: number[]) {
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

        // 如果整个数组都是降序，直接反转
        if (i === 1) {
            reverse(nums, 0, n - 1);
        }
    }
};

// 原地反转数组的辅助函数
function reverse(arr: number[], left: number, right: number) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}