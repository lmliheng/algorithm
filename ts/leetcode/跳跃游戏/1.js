/**
 * @跳跃游戏1
 */


/**
 * 
 * @实时维护一个最远距离，i <= rightmost说明i可以到达，
 * 最后判断rightmost是否大于等于n-1
 */
function canJump(nums) {
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
    return false;
};


/**
 * 
 * @动态规划
 * 时间开销太大了，我第一思路就是dp
 */
function canJump(nums) {
    let n = nums.length
    let dp = new Array(n).fill(false)
    dp[0] = true
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] === true && nums[j] >= (i - j)) {
                dp[i] = true
                break
            }
        }
    }
};


