let temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
let stack = []
let res = new Array(temperatures.length).fill(0)
for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
        let top = stack.pop()
        res[top] = i - top
    }
    stack.push(i)
}
console.log(res)