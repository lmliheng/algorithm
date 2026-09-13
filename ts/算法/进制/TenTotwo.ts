
/**
 * @param num type number  十进制数
 * @returns type number  二进制数
 */
const TenTotwo = function (num: number) {

    let stack = []
    while (num > 0) {
        stack.unshift(num % 2)
        num = Math.floor(num / 2)
    }
    if (stack.length == 0) {
        stack.unshift(0)
    }
    return +stack.join('')
}

export { TenTotwo }