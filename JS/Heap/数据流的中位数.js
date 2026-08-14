import { minHeap, maxHeap } from './Heap.js'
/**
 * @数据流的中位数
 * 
 * 将数分为两堆，左堆是最大堆 存一半小数，右边是最小堆 存大数
 * 当总数为奇数时，保证左堆要多一
 */

var MedianFinder = function () {
    this.minHeap = new minHeap()
    this.maxHeap = new maxHeap()
};

/** 
 * @写入
 * 先放左堆，再把堆顶给右堆，检查左右堆大小
 */
MedianFinder.prototype.addNum = function (num) {
    this.maxHeap.push(num)
    let max = this.maxHeap.pop()
    this.minHeap.push(max)
    if (this.minHeap.size() > this.maxHeap.size()) {
       
        let min = this.minHeap.pop()
        this.maxHeap.push(min)
    }

};

/**
 * @读取中位数
 */
MedianFinder.prototype.findMedian = function () {
    if (this.maxHeap.size() > this.minHeap.size()) {
        return this.maxHeap.peak()
    }
    return (this.maxHeap.peak() + this.minHeap.peak()) / 2
};


if (process.argv[2] === 'test') {
    let mf = new MedianFinder()
    
    mf.addNum(4)
    console.log(mf.findMedian())
    mf.addNum(5)
    console.log(mf.findMedian())
    mf.addNum(9)
    console.log(mf.findMedian())
    mf.addNum(10)
    console.log(mf.findMedian())
}
