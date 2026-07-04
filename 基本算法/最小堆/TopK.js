import { minHeap } from "./minHeap.js"
/**
 * 建立一个最小堆（大小为 K）遍历数组：如果堆未满，直接入堆，如果堆已满且当前元素 > 堆顶（最小值），则替换堆顶并调整堆
 * 因为堆顶是当前最小的，只有比它大的才值得进来，这样堆里始终维护着当前最大的 K 个元素
 */
let nums = [3, 2, 3, 1, 2, 4, 5, 5, 6]
let k = 4

let heap = new minHeap()
for (let i = 0; i < k; i++) {
    heap.push(nums[i])
}
console.log('堆满：', heap)
for (let i = k; i < nums.length; i++) {
    if (heap.peak() < nums[i]) {
        heap.pop()
        heap.push(nums[i])
    }

}

console.log(heap)
console.log(heap.peak())