
class TimeLimitedCache {
    map: Map<number, { value: number, timer: any }> = new Map()
    constructor() {

    }

    set(key: number, value: number, duration: number): boolean {
        const timer = setTimeout(() => {
            this.map.delete(key)
        }, duration)
        if (!this.map.has(key)) {
            this.map.set(key, { value: value, timer: timer })
            return false
        } else {
            // 清理上次的timer
            clearTimeout(this.map.get(key)?.timer)
            this.map.delete(key)
            this.map.set(key, { value: value, timer: timer })
            return true
        }
    }

    get(key: number): number {
        if (this.map.has(key)) {
            return this.map.get(key)?.value!
        } else {
            return -1
        }
    }

    count(): number {
        return this.map.size
    }
}

