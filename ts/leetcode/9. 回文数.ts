/**
 * @9. 回文数 
 */
function isPalindrome(x: string) {
    let x_str = x.toString();
    return x_str === x_str.split('').reverse().join('') ? true : false
}