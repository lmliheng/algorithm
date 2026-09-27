/**
 * @difficulty easy
 * @tags 数学,字符串
 * @time O(n)
 * @space O(n)
 * @note 转成字符串反转后比较
 * @9. 回文数 
 */
function isPalindrome(x: string) {
    let x_str = x.toString();
    return x_str === x_str.split('').reverse().join('') ? true : false
}