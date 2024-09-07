package 验证回文串.src.test;

import 验证回文串.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        String s1 = "A man, a plan, a canal: Panama";
        String s2 = "race a car";
        System.out.println(new Solution().isPalindrome(s1));
        System.out.println(new Solution().isPalindrome(s2));

    }
}
