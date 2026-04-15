package 回文数P9.src.test;

import 回文数P9.src.main.Solution;

public class Test {

    public static void main(String[] args) {
        Solution solution = new Solution();

        System.out.println(solution.isPalindrome(123)); // 应该输出 true
        System.out.println(solution.isPalindrome(-123));
        System.out.println(solution.isPalindrome(121));


    }
}
