
/**
 * @ES6写法里的class
 * 之前都是构造函数
 * 
 * 都是在创建 对象模板
 * 
 */
class obj {
    constructor(item) {
        this.data = item
    }
    method() {
        console.log('实例方法')
    }
    static static_method() {
        console.log('静态方法')
    }
}

if (process.argv[2] == 'Obj') {
    let o = new obj()
    o.method()
    obj.static_method()
}