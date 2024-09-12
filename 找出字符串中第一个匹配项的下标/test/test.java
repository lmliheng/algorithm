package 找出字符串中第一个匹配项的下标.test;

import 找出字符串中第一个匹配项的下标.main.Solution;

public class test {
    public static void main(String[] args) {
        String haystack = "hello";
        String needle = "ll";
        Solution solution = new Solution();
        int i = solution.strStr(haystack, needle);
        System.out.println(i);
        System.out.println("hello".indexOf("ll"));

    }
}
