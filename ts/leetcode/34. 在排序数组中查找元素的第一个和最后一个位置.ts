/**
 * @34. 在排序数组中查找元素的第一个和最后一个位置
 */

import { lowerBound } from "../算法/二分查找/二分查找.js";

function searchRange(nums: number[], target: number) {
    let index1 = lowerBound((mid) => nums[mid] >= target, 0, nums.length)
    let index2 = lowerBound((mid) => nums[mid] > target, 0, nums.length)
    if (index1 == nums.length || nums[index1] !== target) {
        return [-1, -1]
    }

    return [index1, index2 - 1]
};

