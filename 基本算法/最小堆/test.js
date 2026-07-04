import { minHeap } from "./minHeap.js";
import { maxHeap } from "./maxHeap.js";

let minHeap1 = new minHeap()
minHeap1.push(10)
minHeap1.push(4)
minHeap1.push(7)
minHeap1.push(2)
minHeap1.push(5)

console.log(minHeap1)


console.log(minHeap1.peak())

minHeap1.push(6)

console.log(minHeap1)

console.log(minHeap1.pop())
console.log(minHeap1)
console.log(minHeap1.pop())
console.log(minHeap1)
console.log(minHeap1.pop())
console.log(minHeap1)


let maxHeap1 = new maxHeap()
maxHeap1.push(10)
maxHeap1.push(4)
maxHeap1.push(7)
maxHeap1.push(2)
maxHeap1.push(5)

console.log(maxHeap1)


console.log(maxHeap1.peak())

maxHeap1.push(6)

console.log(maxHeap1)

console.log(maxHeap1.pop())
console.log(maxHeap1)
console.log(maxHeap1.pop())
console.log(maxHeap1)
console.log(maxHeap1.pop())
console.log(maxHeap1)