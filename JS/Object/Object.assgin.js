/**
 * @assign静态方法用于合并两个对象的所有属性
 * @return 新对象
 */
let a = {
    name: '张三',
    age: 18
}
let b = { aera: 'china' }
console.log(Object.assign(a, b))