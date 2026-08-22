
/**
 * @使用Map完成
 * 
 * 使用了Map的keys()方法，这里的keys()是有序的，和set的顺序一样
 * 
 * 其他语言使用map + 双向链表完成
 */
class LRUCache {
    private capacity: number
    private map
    constructor(capacity: number) {
        this.capacity = capacity
        this.map = new Map()
    }

    get(key: number): number {
        if (!this.map.has(key)) {
            return -1
        } else {
            // 更新缓存优先级
            let val = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, val)
            return val
        }
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            this.map.delete(key)
            this.map.set(key, value)
        } else {
            if (this.map.size == this.capacity) {
                let deleteKey = this.map.keys().next().value
                this.map.delete(deleteKey)
            }
            this.map.set(key, value)
        }
    }
}

