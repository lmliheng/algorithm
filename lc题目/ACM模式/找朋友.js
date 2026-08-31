/**
 * @找朋友
 * 
 *
 * A，B班均有N个同学，每个同学有兴趣值，用Ai和Bi数组表示，需要A班B班同学一一匹配，
 * 每一对的矛盾值为(Ai+Bi)mod M，M是常数，求所有矛盾值的最小值
 * 
 * 第一行 N M
 * 第二行 Ai
 * 第三行 Bi
 * 
 * 
 * 贪心：最大化配对中满足 Ai + Bi >M 的数量（每多一对溢出，总和就减 M)，
 *       将A,B都按升序排列，"two pointer"贪心，如果A的左指针和B的右指针的值大于M，
 *       成对写入答案，并更新A左指针 B右指针，如果不足M，那么将A左指针 B左值指针加入到答案
 * 
 */

import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
let lines = []
rl.on('line', (line) => {
    lines.push(line)
}).on('close', () => {
    let [N, M] = lines[0].trim().split(' ').map(item => +item)
    let A = lines[1].trim().split(' ').map(item => +item).sort((a, b) => a - b)
    let B = lines[2].trim().split(' ').map(item => +item).sort((a, b) => a - b)
    let i = 0, j = N - 1;
    let l = 0, r = N - 1;
    let total = 0;

    while (i <= j) {
        if (A[i] + B[r] >= M) {
            total += (A[i] + B[r]) % M;
            i++;
            r--;
        } else {
            total += A[i] + B[l];
            i++;
            l++;
        }
    }

    console.log(total);
})



/**
 * 3 10
 * 1 3 5
 * 2 4 6
 * 11
 * 
 * 3 10
 * 2 4 9
 * 1 3 8
 * 7
 */