/**
 * @150. 逆波兰表达式求值
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens: string[]): number {
    // 向零截断
    const ToZero = (val: number): number => {
        if (val >= 0) {
            return Math.floor(val)
        } else if (Number.isInteger(val)) {
            return val
        } else {
            return Math.floor(val) + 1
        }
    }
    // 从左至右
    for (let i = 0; i < tokens.length; i++) {
        if (tokens.length === 1) {
            return +(tokens[0])
        }
        if (tokens[i] === '+') {
            let num: number = (+tokens[i-1]) + (+tokens[i-2])
            tokens.splice(i-2, 3, num.toString())
            i = i - 2
        } else if (tokens[i] === '-') {
            let num: number = (+tokens[i-2]) - (+tokens[i-1])
            tokens.splice(i-2, 3, num.toString())
            i = i - 2
        } else if (tokens[i] === '*') {
            let num: number = (+tokens[i-1]) * (+tokens[i-2])
            tokens.splice(i-2, 3, num.toString())
            i = i - 2
        } else if (tokens[i] === '/') {
            console.log(tokens)
            let num: number = ToZero((+tokens[i-2]) / (+tokens[i-1]))
            tokens.splice(i-2, 3, num.toString())
            console.log(tokens)
            i = i - 2
        }
    }

    if (tokens.length === 1) {
        return +(tokens[0])
    }
    return 0
}

// console.log(evalRPN(["1","3","+","4","*"]))
// console.log(evalRPN(["4","13","5","/","+"]))
// console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))

console.log(evalRPN(["4","-2","/","2","-3","-","-"]))

export {};
