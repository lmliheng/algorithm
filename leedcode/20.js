// JavaScript 中可以通过数组实现栈数据结构。栈是一种遵循后进先出（LIFO）原则的数据结构，它只允许在栈顶进行插入和删除操作


function Stack() {
    this.items = []; // 使用数组来存储栈中的元素
}
Stack.prototype = {
    constructor: Stack,
    // 入栈操作
    push(element) {
        this.items.push(element);
    },

    // 出栈操作
    pop() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }
        return this.items.pop();
    },

    // 查看栈顶元素
    peek() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }
        return this.items[this.items.length - 1];
    },

    // 判断栈是否为空
    isEmpty() {
        return this.items.length === 0;
    },
    // 获取栈的大小
    size() {
        return this.items.length;
    },
    // 清空栈
    clear() {
        this.items = [];
    },

    // 遍历栈（可选，为了展示栈的内容）
    traverse() {
        for (let i = this.items.length - 1; i >= 0; i--) {
            console.log(this.items[i]);
        }
    }
}

/**
* @param {string} s
* @return {boolean}
*/

// 栈
var isValid = function (s) {

    let stack = new Stack()
    console.log('字符串s:', s)

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i])
            console.log('入栈')
        } else {
            if (s[i] === ')' || s[i] === ']' || s[i] === '}') {
                console.log('s[i]', s[i], typeof s[i])
                console.log('stack.peek()', stack.peek(), typeof stack.peek())

                if (stack.isEmpty()) {
                    return false
                }

                if (Math.abs(s[i].charCodeAt() - stack.peek().charCodeAt()) < 3) {
                    stack.pop()
                    console.log('出栈')


                } else {
                    console.log('提前结束')
                    return false
                }

            }

        }
    }

    if (stack.isEmpty()) {
        return true
    }
    return false

};

// console.log(isValid("({})"))
// console.log(isValid("()[]{}"))
// console.log(isValid("()[]"))
// console.log(isValid("(]"))
// console.log(isValid("(["))
console.log(isValid("(){}}{"))
console.log(isValid("}"))
console.log(isValid("([)]"))



