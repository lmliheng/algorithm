/**
 * @295. 数据流的中位数
 */
/**
 * @数据流的中位数
 * 以下方法超时
 * 使用堆
 */


var MedianFinder = function () {
    this.arr = [] as number[]
};
MedianFinder.prototype.addNum = function (num: number) {
    //插入时 arr就是一个升序数组，使用冒泡
    const swap = (a: number, b: number) => { [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]] }
    this.arr.unshift(num)
    for (let i = 1; i < this.arr.length; i++) {
        if (this.arr[i] < this.arr[i - 1]) {
            swap(i, i - 1)
        } else {
            break
        }
    }
};

MedianFinder.prototype.findMedian = function (): number {
    let n = this.arr.length
    if (n % 2) {
        return this.arr[(n - 1) / 2]
    } else {
        return (this.arr[n / 2 - 1] + this.arr[n / 2]) / 2
    }
};

let MF = new MedianFinder()
MF.addNum(11)
MF.addNum(5)
MF.addNum(9)
MF.addNum(8)

console.log(MF.arr)
