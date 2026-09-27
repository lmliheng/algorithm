/**
 * @difficulty medium
 * @tags 位运算,数组
 * @time O(32*n)
 * @space O(1)
 * @note 按位统计0/1个数，乘积累加
 * @477. 汉明距离总和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums: number[]): number {
    let res = 0;
    for (let i = 0; i < 32; ++i) {
        let bit0 = 0, bit1 = 0;
        for (let num of nums) {
            if (num >> i & 1) {
                ++bit1;
            } else {
                ++bit0;
            }
        }
        res += bit0 * bit1;
    }
    return res;

};
