/**
 * @对象的基本写法
 * 属性的读取编辑 遍历
 */
const obj = {
    name: 'kimi',
    version: '3',
    desp: '开源模型',
    1:'test'
}

/**
 * @遍历属性
 */
for (const key in obj) {
    // 这个写法里key可以是变量，按理说key必须是string，但是变量是数字也能用，参考下面a
    console.log(key, obj[key])
    // 这个写法里 key必须写死
    console.log(key, obj.key)
}


/**
 * @属性访问
 * 以下写法都没有报错
 */
let a=1
console.log(obj.name) 
console.log(obj.xxx) // undefined
console.log(obj['name'])
console.log(obj['xxx'])
// 这个是可以读取的，变量是数字
console.log(obj[a])
if(obj.liheng==undefined){
    console.log('属性不存在')
}




