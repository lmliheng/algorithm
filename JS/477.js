/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function (nums) {
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