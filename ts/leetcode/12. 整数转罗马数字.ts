/**
 * @12. 整数转罗马数字
 */

function intToRoman(num: number) {
    let M_str = ['', 'M', 'MM', 'MMM']
    let C_str = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
    let X_str = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
    let I_str = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
    return M_str[Math.floor(num / 1000 | 0)] + C_str[Math.floor(num % 1000 / 100)] + X_str[Math.floor(num % 100 / 10)] + I_str[num % 10]
};