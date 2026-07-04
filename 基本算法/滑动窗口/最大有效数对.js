/**
 *@最大有效数对
 */
var maxValidPairSum = function (nums, k) {
    let n = nums.length;
    let res = -Infinity;
    let l_max = -Infinity;

    for (let i = k; i < n; i++) {
        // 当前左边界是 i-k，更新到这一步为止左侧的最大值
        l_max = Math.max(l_max, nums[i - k]);
        // 此时 l_max 一定是索引 <= i-k 中的最大值
        res = Math.max(res, l_max + nums[i]);
    }
    return res;
};


let nums = [1, 3, 5, 2, 8]
let k = 2