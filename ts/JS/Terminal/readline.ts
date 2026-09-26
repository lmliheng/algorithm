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
    output: process.stdout,
    terminal: true //启动终端模式才能使用data
});

let line = ''
/**
 * @单行输入
 * 和line一个用法，使用rl.question
 */


/**
 * 多行输入
 * @每一行的回调 enter后执行回调
 * 获取每一行输入
 * 
 * 和data事件冲突
 */
// rl.on('line', (line) => {
//     if (line == 'close') {
//         rl.close()
//     }
//     if (line === 'pause') {
//         rl.pause()
//         setTimeout(() => {
//             console.log('恢复输入...')
//             rl.resume()  // 继续监听输入
//         }, 3000)
//     }
//     // rl.write('【监听每一行】')
//     console.log('【监听每一行】', line)
// })

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


const commands = ['/help', '/deploy', '/login', '/logout'];

/**
 * @每次输入都执行回调
 */
rl.on('data', (buf) => {
    const key = buf.toString();
    // console.log("data回调：", key)
    rl.write(`data回调：${key}`)
    if (key === '\u0003') process.exit(); // Ctrl+C

    if (key === '/') {
        line += '/';
        showSlashMenu(line);
    } else if (key === '\t') {
        // Tab → 选中第一个或循环
    } else if (key === '\r') {
        // 回车执行
        console.log('\nEXEC:', line);
        line = '';
    } else if (key === '\u007f') {
        line = line.slice(0, -1); // backspace
    } else {
        line += key;
        if (line.startsWith('/')) showSlashMenu(line);
    }

    rl.write('\r\x1b[K> ' + line);
});

function showSlashMenu(input: string) {
    const matched = commands.filter(c => c.startsWith(input));
    console.log('\n' + matched.join('  '));
}