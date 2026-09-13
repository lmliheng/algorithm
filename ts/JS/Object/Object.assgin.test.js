/**
 * @assign静态方法用于合并两个对象的所有属性
 * @return 新对象
 * @相同属性后者会覆盖属性值
 */
let a = {
    name: '张三',
    age: 18
}
let b = {
    aera: 'china',
    name: '里斯'
}
console.log(Object.assign(a, b))


/***
 * 根据id合并数组lc
 */
let arr1 = [
    { "id": 1, "b": { "b": 94 }, "v": [4, 3], "y": 48 }
]
let arr2 = [
    { "id": 1, "b": { "c": 84 }, "v": [1, 3] }
]

let res = {}
for (let obj of arr1) {
// ?? 是什么写法 空值合并运算符
    res[obj.id] = Object.assign(res[obj.id] ?? {}, obj)
}
for (let obj of arr2) {
    res[obj.id] = Object.assign(res[obj.id] ?? {}, obj)
}
console.log(Object.values(res).sort((a, b) => a.id - b.id))
