/**
 * @console webAPI
 */
console.log('好吧')
console.error('ok...')
console.debug('..')
console.warn('..')

/**
 * @记录任务时长
 * 实际上这里的耗时是注册任务所需时间
 */
console.time('任务耗时')
// 注册宏任务
setTimeout(() => { }, 2000)
console.timeLog('任务耗时', '运行到xxx')
setTimeout(() => { }, 3000)
console.timeEnd('任务耗时')


/**
 * @表格化打印
 */
console.table([
    { id: 1, name: '张三', age: 25, city: '北京' },
    { id: 2, name: '李四', age: 30, city: '上海' },
    { id: 3, name: '王五', age: 28, city: '深圳' }
])


/**
 * @断言
 * 错误：Assertion failed
 */
console.assert(null instanceof Object)


/**
 * @trace堆栈追踪
 */
function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.trace('调用路径追踪');
}
a()


/**
 * @中对日志进行分组折叠
 */
console.group('用户信息');
console.log('姓名：张三');
console.log('年龄：25');
console.log('城市：北京');
console.groupEnd();


/**
 * @记录函数执行次数
 */
const testCount = () => {
    console.count('执行函数次数')
}
for (let i = 0; i < 3; i++) {
    testCount()
}


/**
 * @dir
 *  用树形结构展示对象，适合深入探查对象内部
 */
let obj = {
    name: 'tencent',
    age: '20',
    product: {
        qq: {
            name: 'qq'
        },
        weixin: {
            name: 'weixin'
        }

    }
}
console.dir(obj)
console.dir(obj, { depth: null });  // 无限展开所有层级
console.dir(obj, { depth: 1 });


console.log('\x1b[34m腾讯\x1b[32m元宝\x1b[0m');

