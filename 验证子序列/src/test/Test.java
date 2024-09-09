package 验证子序列.src.test;


import 验证子序列.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        String s = "abc";
        String t = "ahbgdc";
        Solution solution = new Solution();
        boolean subsequence = solution.isSubsequence(s, t);
        System.out.println(subsequence);
    }

}
