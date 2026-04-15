package 长度最小的子数组.src.test;

import 长度最小的子数组.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        int[] nums = {2, 3, 1, 2, 4, 3};
        System.out.println(new Solution().minSubArrayLen(7, nums));
        System.out.println(new Solution().minSubArrayLen(8, nums));

    }
}
