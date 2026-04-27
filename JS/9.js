/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let x_str = x.toString();
    return x_str === x_str.split('').reverse().join('') ? true : false
}

console.log(isPalindrome(-121));
