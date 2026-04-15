/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    //js 数组对象的原型方法本来就有栈的方法
    if(s.length%2){
        return false
    }
    const stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            stack.push(s[i])
        } else {
            if ((s[i] == ')' && stack[stack.length - 1] == '(') || (s[i] == ']' && stack[stack.length - 1] == '[') || (s[i] == '}' && stack[stack.length - 1] == '{')) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    if (stack.length === 0) {
        return true
    }else{
        return false
    }
};

isValid('()')