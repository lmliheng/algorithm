import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @ACM模式
 * 转置矩阵
 */

const lines = [];

rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const [m, n] = lines[0].trim().split(' ').map(item => +item)
    const matrix = Array.from({ length: m }, () => 0)
    for (let i = 0; i < m; i++) {
        matrix[i] = lines[i + 1].trim().split(' ').map(item => +item)
    }
    let res = transpose(matrix)
    for (const row of res) {
        console.log(row.join(' '));
    }

})


/**
 * @主函数
 */
function transpose(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
        res[i] = new Array(m);
        for (let j = 0; j < m; j++) {
            res[i][j] = matrix[j][i];
        }
    }
    return res;
}