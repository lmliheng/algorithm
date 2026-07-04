import { MinHeap } from './minHeap.js'

let nums1 = [1, 7, 11]
let nums2 = [2, 4, 6]
let k = 3

let n1 = nums1.length
let n2 = nums2.length
nums1.sort((a, b) => a - b)
nums2.sort((a, b) => a - b)
const heap = new MinHeap()
const result = []

for (let i = 0; i < Math.min(n1, k); i++) {
    heap.push([nums1[i], nums2[0], 0])
}

while (result.length < k && heap.size() > 0) {
    const [num1, num2, idx2] = heap.pop()
    result.push([num1, num2])
    
    if (idx2 + 1 < n2) {
        heap.push([num1, nums2[idx2 + 1], idx2 + 1])
    }
}

console.log(result)