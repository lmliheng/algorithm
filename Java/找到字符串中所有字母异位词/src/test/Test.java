package 找到字符串中所有字母异位词.src.test;

import 找到字符串中所有字母异位词.src.main.Solution;

public class Test {
    public static void main(String[] args) {
//        s = "cbaebabacd", p = "abc"
        String s = "cbaebabac";
        String p = "abc";
        System.out.println(new Solution().findAnagrams(s,p));



    }
}
