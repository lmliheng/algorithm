

/**
 * 
 * base表示进制(radix)
 * @二进制转十进制
 * 
 * 1. 使用乘法
 * 2. 位运算
 * 3. parseInt(string, radix)
 * 用位运算更快
 */

/**
 * @base进制数转十进制
 * num是base进制数
 */
export function ToTen(base: number, num: number) {
    if (base < 2 && base > 36) { throw new Error('不支持进制高于36低于1的数') }
    return parseInt(String(num), base)
}

/**
 * @十进制转n进制
 * 
 * num:十进制数
 * toString(radix)
 */
export function TenTo(base: number, num: number): string {
    if (base < 2 && base > 36) { throw new Error('不支持进制高于36低于1的数') }
    return num.toString(base)
}

