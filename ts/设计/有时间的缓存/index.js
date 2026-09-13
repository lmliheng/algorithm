class TimeLimitedCache {
    map = new Map();
    constructor() {
    }
    set(key, value, duration) {
        const timer = setTimeout(() => {
            this.map.delete(key);
        }, duration);
        if (!this.map.has(key)) {
            this.map.set(key, { value: value, timer: timer });
            return false;
        }
        else {
            // 清理上次的timer
            clearTimeout(this.map.get(key)?.timer);
            this.map.delete(key);
            this.map.set(key, { value: value, timer: timer });
            return true;
        }
    }
    get(key) {
        if (this.map.has(key)) {
            return this.map.get(key)?.value;
        }
        else {
            return -1;
        }
    }
    count() {
        return this.map.size;
    }
}
export {};
