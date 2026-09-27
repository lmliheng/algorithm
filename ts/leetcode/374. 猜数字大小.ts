/**
 * @difficulty easy
 * @tags 二分
 * @time O(log n)
 * @space O(1)
 * @note 按 guess 返回值收缩二分区间
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
