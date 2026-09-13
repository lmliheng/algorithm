/**
 * @礼盒总价
 * 
 * 
 * 某家商店为了回馈客户，推出了由两种商品组合而成的促销礼盒。
 * 商店现有的第一类商品共有N款，第i款的单价为a;第二类商品共有M款，第j款的单价为b。
 * 一个礼盒必须包含第一类商品和第二类商品各一款。
 * 为了让利消费者，商店设定了一个最高限价P。礼盒的最终售价为min(aj+b,P)，即当两款商品原价之和，超过P时，礼盒按P元出售；未超过则按原价之和出售
 * 店长希望统计一下，如果将第一类和第二类的所有可能组合(共NxM种)都各销售一份，商店最终的总销售额是多少?
 * 
 * 暴力解 O(MN)，
 * 
 * 优化思路：找到一个临界点，之后的组合结果都是P，这就是题目的考察点。
 * 下面的解法 最坏情况还是MN
 * 
 * 
 * 第一行 N M P
 * 第二行a数组
 * 第三行b数组
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
    let [N, M, P] = lines[0].trim().split(' ').map(item => +item)
    let A = lines[1].trim().split(' ').map(item => +item).sort((a, b) => a - b)
    let B = lines[2].trim().split(' ').map(item => +item).sort((a, b) => a - b)
    let res = 0

    A.sort((a, b) => a - b)
    B.sort((a, b) => a - b)

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (A[j] + B[i] >= P) {
                res += (N - j) * P
                break
            } else {
                res += A[j] + B[i]
            }
        }
    }


    // 暴力O(n2)
    // for (let i = 0; i < M; i++) {
    //     for (let j = 0; j < N; j++) {
    //         if (A[j] + B[i] > P) {
    //             res += P
    //         } else {
    //             res += A[j] + B[i]
    //         }
    //     }
    // }
    console.log(res)
})
