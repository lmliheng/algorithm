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