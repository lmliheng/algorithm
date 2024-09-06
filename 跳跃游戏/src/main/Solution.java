package 跳跃游戏.src.main;

public class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;


        if (n <= 1) {
            return true;
        }

        if (nums[0]==0)
        {
            return false;
        }

        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] >= n - i - 1) {
                return true;
            }
        }

        return false;



        }


}