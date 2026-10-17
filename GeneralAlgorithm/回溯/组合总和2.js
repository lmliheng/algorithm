/**
 * @组合总和2
 * 不是很明白
 */
let candidates = [10, 1, 2, 7, 6, 1, 5, 10]
let target = 8
// 通过start防止重复遍历同一元素

let stack = []
candidates.sort((a, b) => a - b)
let n = candidates.length
let res = []
const trackBack = (stack, start, target) => {
    if (target === 0) {
        res.push([...stack])
        return
    }
    for (let i = start; i < n; i++) {

        if (i > start && candidates[i] === candidates[i - 1]) {
            continue
        }
        if (target - candidates[i] < 0) {
            break
        }
        // 

        stack.push(candidates[i])
        trackBack(stack, i + 1, target - candidates[i])
        stack.pop()
    }

}

trackBack(stack, 0, target)

console.log(res)