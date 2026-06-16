let s = ")()())"
let max = 0
let stack = [-1]
for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
        stack.push(i)
    } else {
        stack.pop()
        if (stack.length === 0) {
            stack.push(i); // 新的基准
        } else {
            max = Math.max(max, i - stack[stack.length - 1]);
        }

    }

    console.log(stack)
}

console.log(max)

// 输入: ")()())"

// i=0 ')' → stack.pop() → stack=[] → push(0) → stack=[0]     // 无匹配，重置基准
// i=1 '(' → stack=[0, 1]                                      // 记录左括号位置
// i=2 ')' → stack.pop() → stack=[0] → len=2-0=2, maxLen=2    // 匹配成功，长度2
// i=3 '(' → stack=[0, 3]                                      // 记录左括号位置
// i=4 ')' → stack.pop() → stack=[0] → len=4-0=4, maxLen=4    // 匹配成功，长度4
// i=5 ')' → stack.pop() → stack=[] → push(5) → stack=[5]     // 无匹配，重置基准

