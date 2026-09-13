import { lowerBound,BinarySearch_1 } from './二分查找.js'
/**
 * 
 * @在排序数组中查找元素的第一个和最后一个位置

 */

function searchRange(nums, target) {
    let index1 = lowerBound((mid) => nums[mid] >= target, 0, nums.length)
    let index2 = lowerBound((mid) => nums[mid] > target, 0, nums.length)
    if (index1 == nums.length || nums[index1] !== target) {
        return [-1, -1]
    }
    return [index1, index2 - 1]
};

function searchRange(nums, target) {
    let index1 = search(nums, target)
    let index2 = search(nums, target + 1)
    console.log(index1, index2)
    if (index1 == nums.length || nums[index1] !== target) { return [-1, -1] }
    if (index2 == nums.length) { return [index1, nums.length - 1] }
    return [index1, index2 - 1]
};


/**
 * 
 * @第一个大于等于target元素的索引,没有则返回数组长度
 * 和BinarySearch_1效果一样
 */
function search(nums, target) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)

        if (nums[mid] >= target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return left

}
