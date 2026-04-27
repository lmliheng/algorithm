/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    // 从右至左 找到第一个非递增的元素
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // 递减数组 直接反转数组
    if (i == -1) {
        nums.reverse()
        return nums
    }

    // 从右至左 找到第一个大于 nums[i] 的元素
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
        j--;
    }
    // 交换 nums[i] 和 nums[j]
    // [nums[i], nums[j]] = [nums[j], nums[i]];
    let temp1 = nums[i]
    nums[i] = nums[j]
    nums[j] = temp1
    // 反转 nums[i+1:] 到 nums[end]
    console.log('i=', i, 'j=', j)
    console.log(nums)

    let l = i + 1 //1
    let r = nums.length - 1 //2
    for (let k = l; k < r; k++, r--) {
        let temp2 = nums[k]
        nums[k] = nums[r]
        nums[r] = temp2
        console.log(nums)
    }
    return nums
};

console.log(nextPermutation([1, 3, 2]))