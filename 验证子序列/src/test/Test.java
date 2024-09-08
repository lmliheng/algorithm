package 验证子序列.src.test;

import 除自身以外数组的乘积.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        Solution solution = new Solution();
        int[] result = solution.productExceptSelf(nums);
        for (int i : result) {
            System.out.println(i);
        }
    }
}
