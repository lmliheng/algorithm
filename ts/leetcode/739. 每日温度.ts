/**
 * @difficulty medium
 * @tags 单调栈,数组
 * @time O(n)
 * @space O(n)
 * @note 单调栈存下标，出栈时得到等待天数
 * @739. 每日温度
 */
let temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
let stack: number[] = []
let res = new Array(temperatures.length).fill(0)
for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
        let top = stack.pop()!
        res[top] = i - top
    }
    stack.push(i)
}
console.log(res)
