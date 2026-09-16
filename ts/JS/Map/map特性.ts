/**
 * @Map
 * hashMap
 * 
 * HashMap 大家都清楚，底层是 数组 + 红黑树 + 链表 （不清楚也没有关系），同时其是无序的，
 * 而 LinkedHashMap 刚好就比 HashMap 多这一个功能，就是其提供 有序
 */

let obj1: Object | null = {
    name: '哈哈'
}
let obj2: Object | null = {
    name: '哈哈'
}

let map = new Map()
let Weakmap = new WeakMap()

map.set(obj1, 'map')
Weakmap.set(obj2, 'weakmap')

console.log(map)
console.log(Weakmap) // WeakMap { <items unknown> } 不可获取键

obj1 = null
obj2 = null

console.log(map)
console.log(Weakmap)


