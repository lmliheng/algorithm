/**
 * @环形子数组的最大和
 * @子题lc54最大子数组和
 * 
 * 这里是灵茶山艾府的解法，正难则反
 * 
 */

let nums = [1,-2,3,-2]

var maxSubarraySumCircular = function(nums) {
    let maxF = 0; // 计算最大子数组和的 DP 数组（空间优化成一个变量）
    let maxS = -Infinity; // 最大子数组和，不能为空
    let minF = 0; // 计算最小子数组和的 DP 数组（空间优化成一个变量）
    let minS = 0; // 最小子数组和，可以为空（元素和为 0）
    let sum = 0; // nums 的元素和
    for (const x of nums) {
        // 53. 最大子数组和（空间优化写法）
        maxF = Math.max(maxF, 0) + x;
        maxS = Math.max(maxS, maxF);
        minF = Math.min(minF, 0) + x;
        minS = Math.min(minS, minF);
        sum += x;
    }
    return maxS < 0 ? maxS : Math.max(maxS, sum - minS);
};

