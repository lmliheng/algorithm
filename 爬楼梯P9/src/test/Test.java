package 爬楼梯P9.src.test;

import 爬楼梯P9.src.main.Solution;

public class Test {

    public static void main(String[] args) {
        String[] strs = {"flower","flow","flight"};
        Solution solution = new Solution();
        String s = solution.longestCommonPrefix(strs);

        System.out.println(s);

    }
}
