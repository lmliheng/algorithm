package 接雨水.src.test;

import 接雨水.src.main.Solution;

public class test {
    public static void main(String[] args) {
        int[] height = {0,1,0,2,1,0,1,3,2,1,2,1};
        Solution solution = new Solution();
        int trap = solution.trap(height);
        System.out.println(trap);
    }
}
