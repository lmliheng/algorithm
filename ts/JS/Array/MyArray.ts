
/**
 * 原生Array都是使用c/c++书写的，
 * 所以我们这里是模拟数组行为，对象存储数组元素
 * 
 * 所有方法和Array一致
 * 
 * 
 * 已完成：
 * 1. 构造函数
 * 2. 原型方法：push,pop,get,map,reduce,some,every,filter，fill,slice,splice
 *    待完成：sort,toSorted,flat，
 * 3. 静态方法：
 *    待完成：from,isArray,
 */



export class MyArray<T> {
    private items: Record<number, T> = {}
    length = 0

    constructor(...elements: T[]) {
        for (const el of elements) {
            this.items[this.length] = el
            this.length++
        }
    }

    push(...elements: T[]): number {
        for (const el of elements) {
            this.items[this.length] = el
            this.length++
        }
        return this.length
    }

    pop(): T | undefined {
        if (this.length == 0) {
            return undefined
        }
        this.length--
        const val = this.items[this.length]
        delete this.items[this.length]
        return val
    }

    /**
     * 
     * @get
     * 获取元素
     */
    get(index: number): T | undefined {
        if (index < 0 && index >= this.length) {
            return undefined
        }
        return this.items[index]
    }


    /**
     * @fill
     * 变异方法
     * 不包括end对应的元素
     */
    fill(value: T, start: number = 0, end: number = this.length): this {
        // 处理负数索引
        const normalizedStart = Math.max(
            start >= 0 ? start : this.length + start,
            0
        )
        const normalizedEnd = Math.min(
            end >= 0 ? end : this.length + end,
            this.length
        )

        for (let i = normalizedStart; i < normalizedEnd; i++) {
            this.items[i] = value
        }
        return this
    }

    /**
     * @splice
     * 变异方法
     * 从指定位置删除/替换/添加元素
     */
    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        // 处理负数 start
        const normalizedStart = start >= 0
            ? Math.min(start, this.length)
            : Math.max(this.length + start, 0)

        // 确定删除数量
        const actualDeleteCount = deleteCount === undefined
            ? this.length - normalizedStart
            : Math.min(Math.max(deleteCount, 0), this.length - normalizedStart)

        // 保存被删除的元素
        const deleted: T[] = []
        for (let i = 0; i < actualDeleteCount; i++) {
            deleted.push(this.items[normalizedStart + i])
        }

        // 计算移动偏移量
        const shift = items.length - actualDeleteCount

        // 如果需要，向右移动后面的元素
        if (shift < 0) {
            // 删除的元素多于添加的元素，向左移动
            for (let i = normalizedStart; i < this.length + shift; i++) {
                this.items[i] = this.items[i - shift]
            }
        } else if (shift > 0) {
            // 添加的元素多于删除的元素，向右移动
            for (let i = this.length - 1 + shift; i >= normalizedStart + actualDeleteCount; i--) {
                this.items[i] = this.items[i - shift]
            }
        }

        // 插入新元素
        for (let i = 0; i < items.length; i++) {
            this.items[normalizedStart + i] = items[i]
        }

        // 更新长度
        this.length += shift

        // 清理多余的位置
        for (let i = this.length; i < this.length + Math.abs(shift); i++) {
            delete this.items[i]
        }

        return deleted
    }



    /**
     * @slice
     * 非变异方法
     * 返回一个新的浅拷贝数组片段
     */
    slice(start: number = 0, end: number = this.length): MyArray<T> {
        // 处理负数索引
        const normalizedStart = start >= 0
            ? Math.min(start, this.length)
            : Math.max(this.length + start, 0)

        const normalizedEnd = end >= 0
            ? Math.min(end, this.length)
            : Math.max(this.length + end, 0)

        const result = new MyArray<T>()

        for (let i = normalizedStart; i < normalizedEnd; i++) {
            result.push(this.items[i])
        }

        return result
    }


    /**
     * @map
     * 非变异方法
     */
    map<U>(
        callback: (currentItem: T, currentIndex: number, array: MyArray<T>) => U,
        thisArg?: any
    ): U[] {
        const result: U[] = []
        for (let i = 0; i < this.length; i++) {
            result.push(callback.call(thisArg, this.items[i], i, this))
        }
        return result
    }




    /**
     * @reduce
     * 非变异方法
     */
    reduce<U>(
        callback: (previousValue: U, currentValue: T, currentIndex: number, array: MyArray<T>) => U,
        initialValue: U
    ) {
        let previousValue = initialValue
        for (let i = 0; i < this.length; i++) {
            previousValue = callback(previousValue, this.items[i], i, this)
        }
        return previousValue
    }

    /**
     * @some
     * O(n)
     * 有一个满足条件就返回true，反之false
     * 非变异
     */
    some(fn: (value: T, index: number, array: MyArray<T>) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (fn(this.items[i], i, this)) {
                return true
            }
        }
        return false
    }

    /**
     * @every
     * O(n)
     */
    every(fn: (value: T, index: number, array: MyArray<T>) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (!fn(this.items[i], i, this)) {
                return false
            }
        }
        return true
    }

    /**
     * @使用快速排序和递归排序混合的Tim排序
     * 这里使用Array.sort()方法
     * 变异
     */
    sort(compareFn?: (a: T, b: T) => number): this {
        return this
    }

    /**
     * @toSorted
     * 非变异
     */
    toSorted() {

    }




    /**
     * @join
     * 
     * 非变异
     */
    join() {

    }

    /**
     * @flat
     * 
     */
    flat() {

    }

    /**
     * @filter
     * 非变异
     */
    filter(
        fn: (value: T, index: number, array: MyArray<T>) => MyArray<T>
    ): MyArray<T> {
        let FilterResult = new MyArray<T>
        for (let i = 0; i < this.length; i++) {
            if (fn(this.items[i], i, this)) {
                FilterResult.push(this.items[i])
            }
        }
        return FilterResult
    }



    /**
     * @from
     * 静态方法：构建数组
     */
    static from() {

    }


}


if (process.argv[2] == 'test') {
    let arr = new MyArray(10, 2, 1, 7, 8)
    console.log(arr.push(1, 2, 1))
    console.log(arr)
    console.log(arr.pop())
    console.log(arr)
    console.log(arr.every((v) => v < 11))
    console.log(arr.some((v) => v < 2))
}