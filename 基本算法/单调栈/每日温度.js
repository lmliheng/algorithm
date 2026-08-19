/**
 * @每日温度
 * 栈里放单减日温的索引
 * 一旦日温比栈顶大，弹出栈顶元素也就是res里索引为i-top
 * 为什么可以弹出，因为要求的是下一次更高温度是几天后，直接弹出就行
 */
export function dailyTemperatures(temperatures) {
    let stack = []
    let res = new Array(temperatures.length).fill(0)
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let top = stack.pop()
            res[top] = i - top
        }
        stack.push(i)
    }
    return res
};