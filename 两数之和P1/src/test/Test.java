package 两数之和P1.src.test;

import 两数之和P1.src.main.Solution;

import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(Arrays.toString(solution.twoSum(new int[]{2, 7, 11, 15}, 9)));
    }

}
