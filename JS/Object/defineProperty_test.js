const object1 = {
    name: "张三",
    age: 18
};

Object.defineProperty(object1, "property1", { // 没有则创建
    value: 42,
    writable: true,
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 可删除
    deleteable: true,

});

Object.defineProperty(object1, "property2", { // 没有则创建
    value: 43,
    writable: true,
    // 可枚举默认是false，不可枚举✅ 属性存在，只是“不可见”
    //enumerable: true,
    // 可配置
    configurable: true,
    // 可删除
    deleteable: true,

});


Object.defineProperty(object1, "name", {
    // 不可写入
    writable: false,
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 可删除
    deleteable: true,

});


object1.name = "李四";
console.log(object1);//张三，因为name属性是不可写入的
console.log(object1.property2);//43
// { name: '张三', age: 18, property1: 42 }


console.log(
  Object.getOwnPropertyDescriptor(object1, "property2")
);
//{ value: 43, writable: true, enumerable: false, configurable: true }

console.log(
  Object.getOwnPropertyDescriptor(object1, "age")
);
// { value: 18, writable: true, enumerable: true, configurable: true }