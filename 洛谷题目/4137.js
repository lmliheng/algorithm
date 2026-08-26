import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const lines = [];

rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const [m, n] = lines[0].trim().split(' ').map(item => +item)
    const arr = lines[1].trim().split(' ').map(item => +item)
    let data = []
    for (let i = 0; i < m; i++) {
        data.push(lines[i + 2].trim().split(' ').map(item => +item))
    }
    for (let i = 0; i < m; i++) {
        console.log(mex(arr, data[i]))
    }
})

/**
 * 
 * @MEX
 * 批量计算 数组子数组的MEX
 * 洛谷不让用Math阿？
 */

function mex(nums, aera) {
    let set = new Set(nums.slice(aera[0] - 1, aera[1]))
    for (let i = 0; i < aera[1] - aera[0]; i++) {
        if (!set.has(i)) {
            return i
        }
    }
    return nums[aera[1] - 1] + 1
}


