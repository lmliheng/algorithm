// import { MinPriorityQueue } from "../最小优先队列/MinPriorityQueue";

class MinPriorityQueue {
    constructor(options = {}) {
        this.heap = [];
        this.compare = options.compare || ((a, b) => a - b);
    }

    enqueue(element) {
        this.heap.push(element);
        this._bubbleUp(this.heap.length - 1);
    }

    dequeue() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }

    front() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            // 如果当前节点比父节点优先级高（比较函数返回负数），则交换
            if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    _sinkDown(index) {
        const length = this.heap.length;

        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            // 比较左子节点
            if (leftChild < length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
                smallest = leftChild;
            }

            // 比较右子节点
            if (rightChild < length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
                smallest = rightChild;
            }

            // 如果最小的节点不是当前节点，则交换并继续下沉
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            } else {
                break;
            }
        }
    }
}


var findSafeWalk = function (grid, health) {
    const m = grid.length, n = grid[0].length;
    const dis = Array.from({ length: m }, () => new Array(n).fill(-1));
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];

    // 使用自定义的最小优先队列
    const pq = new MinPriorityQueue({
        compare: (a, b) => a[0] - b[0]
    });
    pq.enqueue([grid[0][0], 0, 0]);

    while (!pq.isEmpty()) {
        const [val, cx, cy] = pq.dequeue();
        if (dis[cx][cy] >= 0) {
            continue;
        }
        dis[cx][cy] = val;

        for (const [dx, dy] of dirs) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (nx < 0 || ny < 0 || nx >= m || ny >= n || dis[nx][ny] >= 0) {
                continue;
            }

            pq.enqueue([val + grid[nx][ny], nx, ny]);
        }
    }

    return dis[m - 1][n - 1] < health;
};

console.log(findSafeWalk([[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0]], 1))