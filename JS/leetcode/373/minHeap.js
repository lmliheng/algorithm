export class MinHeap {
    constructor() {
        this.heap = []
    }

    push(val) {
        this.heap.push(val)
        this._bubbleUp(this.heap.length - 1)
    }

    pop() {
        if (this.heap.length === 0) return null
        const top = this.heap[0]
        const last = this.heap.pop()
        if (this.heap.length > 0) {
            this.heap[0] = last
            this._sinkDown(0)
        }
        return top
    }

    size() {
        return this.heap.length
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2)
            // 按和的大小比较
            if (this.heap[index][0] + this.heap[index][1] <
                this.heap[parent][0] + this.heap[parent][1]) {
                [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]]
                index = parent
            } else break
        }
    }

    _sinkDown(index) {
        const length = this.heap.length
        while (true) {
            let smallest = index
            const left = 2 * index + 1
            const right = 2 * index + 2

            if (left < length &&
                this.heap[left][0] + this.heap[left][1] <
                this.heap[smallest][0] + this.heap[smallest][1]) {
                smallest = left
            }

            if (right < length &&
                this.heap[right][0] + this.heap[right][1] <
                this.heap[smallest][0] + this.heap[smallest][1]) {
                smallest = right
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
                index = smallest
            } else break
        }
    }
}

