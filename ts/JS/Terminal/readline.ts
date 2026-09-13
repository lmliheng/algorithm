import * as readline from 'readline'



/**
 * @readline
 * 
 * on 监听事件
 * question
 * write
 * 
 * pause/resume 暂停/恢复输入
 * 
 * 
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @单行输入
 * 和line一个用法，使用rl.question
 */


/**
 * 多行输入
 * @每一行的回调 enter后开始执行
 * 获取每一行输入
 * 
 */
rl.on('line', (line) => {
    if (line == 'close') {
        rl.close()
    }
    if (line === 'pause') {
        rl.pause()
        setTimeout(() => {
            console.log('恢复输入...')
            rl.resume()  // 继续监听输入
        }, 3000)
    }
    // rl.write('【监听每一行】')
    console.log('【监听每一行】', line)
})

/**
 * @结束事件的回调
 */
rl.on('close', () => {
    console.log('close事件回调')
})

/**
 * @暂停输入事件的回调
 */
rl.on('pause', () => {
    console.log('pause事件回调')
})
