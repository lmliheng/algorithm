/**
 * @将数组排序的最少替换次数
 */

function minimumReplacement(nums: number[]): number {
    let n = nums.length;
    // 当前位置及右边所有数，经过拆分后，允许的最大值
    let min = nums[n - 1];
    let ans = 0;

    for (let i = n - 2; i >= 0; i--) {
        // 需要将 nums[i] 拆成多少份，使每份 ≤ min
        const z = Math.ceil(nums[i] / min);
        ans += z - 1;
        // 拆完后，最小的一份作为新的 min
        min = Math.floor(nums[i] / z);
    }
    return ans;
}