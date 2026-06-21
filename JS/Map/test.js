let obj1 = {
    name: '哈哈'
}
let obj2 = {
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