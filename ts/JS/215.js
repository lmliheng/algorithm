// 最小堆
class minHeap {
    constructor() {
        this.heap = []
    }
    // 获取堆的容量
    size() {
        return this.heap.length
    }
    // 插入元素
    insert(val) {
        this.heap.push(val)
        let index = this.heap.length - 1
        
        this.up(index)
    }

    // 上移，求父节点：index-1>>1等于Math.floor(index-1/2)
    up(index) {
        while (index > 0 && this.heap[index] < this.heap[(index - 1) >> 1]) {
            this.swap(index, (index - 1) >> 1)
            index = (index - 1) >> 1
        }
    }

    // 下移
    down(index) {
        while (index * 2 + 1 < this.heap.length) {
            let left = index * 2 + 1 // 左子节点
            let right = index * 2 + 2 // 右子节点
            let min = left
            if (right < this.heap.length && this.heap[right] < this.heap[left]) {
                min = right
            }
            if (this.heap[index] > this.heap[min]) {
                this.swap(index, min)
                index = min
            } else {
                break
            }
        }
    }

    // 交换元素位置
    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }

    // 去除堆顶元素 ，不是直接删除，而是交换到数组末尾，再删除数组末尾元素
    pop() {
        this.swap(0, this.heap.length - 1)
        this.heap.pop()
        this.down(0)
    }
    
    // 获取堆顶元素
    peek() {
        return this.heap[0]
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */



var findKthLargest = function(nums, k) {
    const minheap=new minHeap()
    nums.forEach((item) => {
        minheap.insert(item)
    })
    // 保持堆的容量为k
    while(minheap.size()>k){
        console.log(minheap.heap)
        minheap.pop()
    }
    return minheap.peek()
};

console.log(findKthLargest([3,2,1,5,6,4],2))
console.log(findKthLargest([3,2,3,1,2,4,5,5,6],4))
