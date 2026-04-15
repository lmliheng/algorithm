package 轮转数组.src.test;

import 轮转数组.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        int[] nums = {1,2,3,4,5,6,7};
        int k = 3;
        Solution solution = new Solution();
        solution.rotate(nums,k);
    }
}
