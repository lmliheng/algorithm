/**
 * @寻找两个正序数组的中位数
 * 要求时间复杂度是O(log(m+n))
 */



/**
 * 
 * @暴力解法
 * 时间O((m+n)log(m+n))
 * 
 * 没有利用"已排序"的条件
 * 
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    let num = []
    num.push(...nums1, ...nums2) // O(m+n)
    num.sort((a, b) => a - b)  // O((m+n)log(m+n))
    if (num.length % 2 == 0) {
        return (num[num.length / 2 - 1] + num[num.length / 2]) / 2
    } else {
        return num[Math.floor(num.length / 2)]
    }
};