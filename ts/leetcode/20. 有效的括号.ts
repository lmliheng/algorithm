/**
 * @20. 有效的括号 
 */
function isValid(s: string): boolean {
    let stack = []
    let map = new Map([['(', ')'], ['{', '}'], ['[', ']']])
    for (let i = 0; i < s.length; i++) {
        let len = stack.length
        if (s[i] == '(' || s[i] == "{" || s[i] == '[') {
            stack.push(s[i])
            continue
        }
        if (s[i] == ')' || s[i] == '}' || s[i] == ']') {
            if (len == 0) { return false }
            if (map.get(stack[len - 1]) == s[i]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
};