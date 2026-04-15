package 最长公共前缀.src.test;

import 最长公共前缀.src.main.Solution;

public class Test {

    public static void main(String[] args) {
        String[] strs = {"flower","flow","flight"};
        Solution solution = new Solution();
        String s = solution.longestCommonPrefix(strs);

        System.out.println(s);

    }
}
