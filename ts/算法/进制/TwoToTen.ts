
/**
 * @param nums type number 二进制数
 * @returns type number  十进制数
 */
const twoToTen = function (nums: number) {
    let str = nums.toString()
    let num = 0
    for (let i = str.length - 1; i >= 0; i--) {
        num += Math.pow(2, +(str.length - 1 - i)) * +(str[i])
    }
    return num
}

export { twoToTen }
