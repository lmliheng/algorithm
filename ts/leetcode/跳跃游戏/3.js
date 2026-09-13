/**
 * @跳跃游戏3
 * 使用栈的思想
 */
let arr = [4, 2, 3, 0, 3, 1, 2]
let start = 5

let n = arr.length
let visit = new Array(n).fill(false)

let stack = []
// 初始化
if (arr[stack] === 0) {
    console.log('true')
}
if (start + arr[start] < n) {
    stack.push(start + arr[start])
}
if (start - arr[start] >= 0) {
    stack.push(start - arr[start])
}

while (stack.length !== 0) {

    let numIndex = stack.pop()
    if (visit[numIndex]) { continue }
    visit[numIndex] = true
    if (arr[numIndex] === 0) { console.log('true') }
    if (numIndex + arr[numIndex] < n) {
        stack.push(numIndex + arr[numIndex])
    }
    if (numIndex - arr[numIndex] >= 0) {
        stack.push(numIndex - arr[numIndex])
    }

}

