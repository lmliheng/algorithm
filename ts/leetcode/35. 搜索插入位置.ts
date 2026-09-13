/**
 * @35. 搜索插入位置
 */

import { lowerBound } from "../算法/二分查找/二分查找.js";

/**
 * 
 * 时间复杂度log(n)
 */
function searchInsert(nums: number[], target: number) {
    return lowerBound((mid) => nums[mid] >= target, 0, nums.length)
};
