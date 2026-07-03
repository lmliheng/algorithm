/**
 * @优先队列
 * @1.出队为最小元素2.入队排序3.判断是否为空
 */
class PriorityQuene {
    constructor() {
        this.arr = []
    }
    enquene(num) {
        this.arr.push(num)
        this.arr.sort((a, b) => a - b)
    }
    dequene() {
        return this.arr.shift()
    }
    isEmpty() {
        return this.arr.length === 0
    }
}