/**
 * @1631. 最小体力消耗路径（解法二）
 */

/**
 * @最小堆
 */

interface HeapNode {
    effort: number;
    row: number;
    col: number;
}

class MinHeap {
    heap: HeapNode[];

    constructor() {
        this.heap = [];
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    push(node: HeapNode): void {
        this.heap.push(node);
        this._bubbleUp(this.heap.length - 1);
    }

    pop(): HeapNode | null {
        if (this.isEmpty()) return null;
        const min: HeapNode = this.heap[0];
        const last: HeapNode = this.heap.pop()!;
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this._sinkDown(0);
        }
        return min;
    }

    _bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex: number = Math.floor((index - 1) / 2);
            if (this.heap[index].effort >= this.heap[parentIndex].effort) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    _sinkDown(index: number): void {
        const length: number = this.heap.length;
        while (true) {
            let smallest: number = index;
            const leftChild: number = 2 * index + 1;
            const rightChild: number = 2 * index + 2;

            if (leftChild < length && this.heap[leftChild].effort < this.heap[smallest].effort) {
                smallest = leftChild;
            }
            if (rightChild < length && this.heap[rightChild].effort < this.heap[smallest].effort) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}



let heights: number[][] = [[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]
const rows: number = heights.length;
const cols: number = heights[0].length;

// 方向数组：右、下、左、上
const dirs: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// 距离数组，记录到达每个点的最小体力消耗
const dist: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
dist[0][0] = 0;

// 最小堆：[effort, row, col]
const heap: MinHeap = new MinHeap();
heap.push({ effort: 0, row: 0, col: 0 });

while (!heap.isEmpty()) {
    const { effort: d, row: r, col: c } = heap.pop()!;

    // 如果已经到达右下角，返回结果
    if (r === rows - 1 && c === cols - 1) console.log(dist);

    // 如果当前距离大于已知最短距离，跳过
    if (d > dist[r][c]) continue;

    for (const [dr, dc] of dirs) {
        const nr: number = r + dr;
        const nc: number = c + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            // 计算相邻格子的高度差
            const effort: number = Math.abs(heights[nr][nc] - heights[r][c]);
            // 新的路径最大体力消耗
            const newDist: number = Math.max(d, effort);

            if (newDist < dist[nr][nc]) {
                dist[nr][nc] = newDist;
                heap.push({ effort: newDist, row: nr, col: nc });
            }
        }
    }
}

console.log(dist)

export {};
