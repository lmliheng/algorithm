import { minHeap } from './Heap.js'
/**
 * @查找和最小的K对数字
 * 
 * 先将 nums1 的前 min(n1, k) 个元素与 nums2[0] 以及nums[2]元素索引  组成数对入堆
 * 取出堆顶，也就是和最小的数对，开始取出的是nums1[0],nums2[0]
 * 放入nums1[0],nums2[1],此时堆里最小的应该是nums1[0],nums2[1]或者nums1[1],nums2[0],比较谁的和小谁出堆...
 * 
 * 
 * 或者使用map记录放入堆的数对
 * 
 */

function kSmallestPairs(nums1, nums2, k) {
    let n1 = nums1.length
    let n2 = nums2.length
    const heap = new minHeap((a, b) => a[0] + a[1] - b[0] - b[1])
    const result = []
    for (let i = 0; i < Math.min(n1, k); i++) {
        heap.push([nums1[i], nums2[0], 0])
    }
    while (result.length < k && heap.size() > 0) {
        const [num1, num2, idx2] = heap.pop()
        result.push([num1, num2])
        //
        if (idx2 + 1 < n2) {
            heap.push([num1, nums2[idx2 + 1], idx2 + 1])
        }
    }
    return result
};

// console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3))