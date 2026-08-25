/**
 * @有效的完全平方数
 */


/**
 * @
 */
function isPerfectSquare(num) {
    let right = num, left = 0;
    let mid = 0;
    while (right >= left) {
        mid = Math.floor((right + left) / 2)
        if (mid > num / mid) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return (right * right == num);
};



/**
 * 
 * @利用等差数列
 * O(n)太慢了
 */
function isPerfectSquare(num) {
    let sum = 0
    for (let i = 1; i <= num; i += 2) {
        sum += i
        if (sum == num) {
            return true
        }
    }
    return false
};