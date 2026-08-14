/**
 * @柯里化
 * 一种设计技巧，很像闭包
 * 将函数多个参数的输入改成一个一个的输入
 */

function add(x) {
    return (y) => {
        y += x
        return (z) => y + z
    }
}

let step1 = add(1)
let step2 = step1(2)
let step3 = step2(3)

console.log(step1, step2, step3)