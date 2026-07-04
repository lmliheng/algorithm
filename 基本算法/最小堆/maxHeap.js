/**
 * @最大堆
 */

class maxHeap {
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

export { maxHeap }