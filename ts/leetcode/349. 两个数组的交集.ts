/**
 * @349. 两个数组的交集
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1: number[], nums2: number[]): number[] {
    return [...new Set(nums1).intersection(new Set(nums2))]
};
// 可以用filter实现
