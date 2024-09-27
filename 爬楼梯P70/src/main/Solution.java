package 爬楼梯P70.src.main;

public class Solution {
        public static int climbStairs(int n) {
            if (n <= 2) {
                return n;
            }
            int first = 1;
            int second = 2;

            for (int i = 3; i <= n; i++) {
//                    动态规划
                int third = first + second;
                first = second;
                second = third;
            }
            return second;
        }

}


