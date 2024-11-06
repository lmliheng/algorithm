package 跳跃游戏.src.main;

// good solution

public class Solution {
    public boolean canJump(int[] nums) {
        int maxPosition = 0; // record maxPoistion
        for (int i = 0; i < nums.length; i++) {
            if (i > maxPosition) {
                return false; // false
            }
            maxPosition = Math.max(maxPosition, i + nums[i]); // updata maxPosition
            if (maxPosition >= nums.length - 1) {
                return true; // true
            }
        }
        return false; //  false
    }
}