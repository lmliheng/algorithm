let s = "3[a]2[bc]"
let num = 0
let str = ''
let stack = []
for (let ch of s) {
    if (47 < ch.charCodeAt() && 58 > ch.charCodeAt()) {
        num = num * 10 + (+ch)
    } else if (ch === '[') {
        stack.push([num, str])
        num = 0
        str = ''
    } else if (ch === ']') {
        let arr = stack.pop()
        console.log('arr:',arr)
        str = arr[1]+str.repeat(arr[0])
    } else {
        str = str + ch

    }
    console.log('=======', ch)
    console.log(num)
    console.log(str)
    console.log(stack)

}

console.log(str)