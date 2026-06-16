/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity
    this.map = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (this.map.has(key)) {
        // 更新缓存优先级
        let val = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, val)
        return val

    } else {
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.map.has(key)) {
        this.map.delete(key)
    } else if (this.map.size >= this.capacity) {
        let deleteKey = this.map.keys().next().value
        console.log('deleteKey',deleteKey)
        this.map.delete(deleteKey)
    }
    this.map.set(key, value)

};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var obj = new LRUCache(3)
obj.put(1, 2)
obj.put(2, 3)

console.log(obj.get(1))

console.log(obj.map)
obj.put(3, 4)
console.log(obj.map)
console.log(obj.get(1))

console.log(obj.map)

obj.put(2, 4)
console.log(obj.map)