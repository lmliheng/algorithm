/**
 * @Proxy拦截器
 * 对 对象/数组/函数 的get/set行为进行监听

 */

/**
 * @handler支持13种陷阱
 * obj_handler用于对象拦截
 */
let obj_handler = {
    /**
     * @get拦截
     * 1. 隐私值拦截
     * 2. 日志埋点
     * 3. 数据校验
     */
    get(target, prop, receiver) {
        if (prop == 'money') {
            return '不允许读取用户敏感信息'
        }
        return Reflect.get(...arguments)
    },

    /**
     * 
     * @set
     * 1. 数据校验
     * 2. 属性保护(把所有set操作都改成无操作就是readonly)
     */
    set(target, prop, value, receiver) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('age 必须是数字')
        }
        if (prop == 'name') {
            throw new TypeError('不允许修改用户名')
        }
        return Reflect.set(...arguments)
    },

    /**
     * @delete拦截
     * 
     */
    deleteProperty(target, prop) {
        if (prop === 'name') {
            throw new Error('用户名属性不允许删除')
        }
        delete target[prop]
        return true
    }

}



/**
 * @函数拦截
 * 
 */
let fn_handler = {
    apply(target, thisArg, args) {
        console.log('函数被调用了', args)
        return Reflect.apply(...arguments)
    }
}

let obj = {
    name: 'liheng',
    age: 18,
    unversity: 'csu',
    money: 1000
}
let fn = () => {

}

let obj_1 = new Proxy(obj, obj_handler)
let fn_1 = new Proxy(fn, fn_handler)
console.log(obj_1.name)
console.log(obj_1.money)
// obj_1.name='lmliheng'
// delete obj_1.name
fn_1()


