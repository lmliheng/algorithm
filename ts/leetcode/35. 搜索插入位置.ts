/**
 * @difficulty easy
 * @tags 二分,数组
 * @time O(log n)
 * @space O(1)
 * @note lowerBound 二分定位插入下标，注释已写明
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
