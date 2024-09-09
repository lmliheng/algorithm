package 两数之和_输入有序数组.src.test;

import 两数之和_输入有序数组.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = solution.twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }

}
