/**
 * @堆
 * 分最小堆和最大堆
 * 
 */

/**
 * @最大堆
 */

export class maxHeap {
    constructor() {
        this.heap = []
    }
    // 元素入堆并重排
    push(val) {
        this.heap.push(val)
        this.up(this.heap.length - 1)
    }
    // 堆顶元素出堆，返回堆顶值
    pop() {
        this.swap(0, this.heap.length - 1)
        let peak = this.heap.pop()
        this.down(0)
        return peak
    }
    // 堆的大小
    size() {
        return this.heap.length
    }
    // peak查看堆顶元素 不弹出
    peak() {
        if (this.heap.length === 0) {
            return null
        }
        return this.heap[0]
    }

    // 上浮和下沉
    up(index) {
        // Math.floor(2 * index - 1) 可以写成(index-1)>>1
        while (index > 0 && this.heap[(index - 1) >> 1] < this.heap[index]) {
            // 父节点和上浮节点交换 swap
            this.swap(index, (index - 1) >> 1)
            index = (index - 1) >> 1
        }
    }
    down(index) {
        while (index * 2 + 1 < this.heap.length) {
            let left = index * 2 + 1 // 左子节点
            let right = index * 2 + 2 // 右子节点
            let max = left
            if (right < this.heap.length && this.heap[right] > this.heap[left]) {
                max = right
            }
            if (this.heap[index] < this.heap[max]) {
                this.swap(index, max)
                index = max
            } else {
                break
            }
        }
    }
    // a,b都是索引
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }


}

/**
 * @最小堆
 * 一种数组模拟完全二叉树的数据结构，父节点小于等于子节点，通过上浮和下沉满足堆的性质
 * Math.floor((i-1)/2)是其父节点 2*i+1是子左节点 2*i+2是子右节点
 * 堆顶是最小元素
 * 1. 加上了比较函数，用于解决 查找和最小的K对数字 问题
 */
export class minHeap {
    constructor(compareFn = ((a, b) => a - b)) {
        this.heap = []
        // 如果传入了比较函数则使用，否则默认按数值升序
        this.compare = compareFn
    }

    push(val) {
        this.heap.push(val)
        this.up(this.heap.length - 1)
    }

    pop() {
        if (this.heap.length === 0) return null
        this.swap(0, this.heap.length - 1)
        let peak = this.heap.pop()
        this.down(0)
        return peak
    }

    size() {
        return this.heap.length
    }

    peak() {
        if (this.heap.length === 0) return null
        return this.heap[0]
    }

    up(index) {
        // Math.floor(2 * index - 1) 可以写成(index-1)>>1
        while (index > 0 && this.compare(this.heap[index], this.heap[(index - 1) >> 1]) < 0) {
            // 父节点和上浮节点交换 swap
            this.swap(index, (index - 1) >> 1)
            index = (index - 1) >> 1
        }
    }

    down(index) {
        while (index * 2 + 1 < this.heap.length) {
            let left = index * 2 + 1// 左子节点
            let right = index * 2 + 2
            let min = left
            if (right < this.heap.length && this.compare(this.heap[right], this.heap[left]) < 0) {
                min = right
            }
            if (this.compare(this.heap[index], this.heap[min]) > 0) {
                this.swap(index, min)
                index = min
            } else {
                break
            }
        }
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
}



if (process.argv[2] === '--test') {
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
}