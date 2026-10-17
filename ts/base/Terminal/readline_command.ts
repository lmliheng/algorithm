import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commands = ['/help', '/deploy', '/login', '/logout'];

// 用 line 事件最简单，虽然不能实时提示
rl.on('line', (input) => {
    if (input.startsWith('/')) {
        const matched = commands.filter(c => c.startsWith(input));
        console.log('匹配的命令:', matched.join(', '));
    }
    console.log('执行:', input);
});

console.log('输入 / 开头的命令试试');
rl.write('> ');