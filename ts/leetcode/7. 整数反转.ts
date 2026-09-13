/**
 * @7. 整数反转
 */

// 去除末尾0： str.replace(/0+$/, '');


/**
 * 
 * @字符串方法
 * 
 */
function reverse(x: number): number {
    let isPositive = x > 0 ? 1 : 0
    let x_str = isPositive ? x.toString() : x.toString().slice(1)
    x_str = x_str.replace(/0+$/, '').split("").reverse().join('')
    let res = isPositive ? BigInt(x_str) : -BigInt(x_str)
    if (res >= 2147483648 || res < -2147483648) {
        return 0
    }
    return Number(res)
};

/**
 * @应该使用数字方法
 */