/**
 * @55. 跳跃游戏
 */


/**
 * 
 * @贪心
 * 实时维护一个最远距离，i <= rightmost说明i可以到达，最后判断rightmost是否大于等于n-1
 */
function canJump(nums: number[]): boolean {
    let n = nums.length;
    let rightmost = 0;
    for (let i = 0; i < n; ++i) {
        if (i <= rightmost) {
            rightmost = Math.max(rightmost, i + nums[i]);
            if (rightmost >= n - 1) {
                return true;
            }
        }
    }
    return false
};

/**
 * @动态规划开销过大
 */