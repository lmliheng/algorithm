/**
 * @Map
 * hashMap
 * 
 * HashMap 大家都清楚，底层是 数组 + 红黑树 + 链表 （不清楚也没有关系），同时其是无序的，
 * 而 LinkedHashMap 刚好就比 HashMap 多这一个功能，就是其提供 有序
 */


let map = new Map()
// map存的是地址还是数值？地址
map.set({}, 0)
map.set({}, 1)
console.log(map)