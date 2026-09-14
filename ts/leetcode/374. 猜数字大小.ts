/**
 * @374. 猜数字大小
 */
declare function guess(num: number): number;

var guessNumber = function(n: number): number {
    let left = 1
    let right = n
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2)
        let res = guess(mid)
        if (res === 0) return mid
        else if (res === -1) right = mid - 1
        else left = mid + 1
    }
    return left
};
