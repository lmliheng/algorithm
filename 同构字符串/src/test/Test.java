package 同构字符串.src.test;

import 同构字符串.src.main.Solution;

public class Test {

    public static void main(String[] args) {
        Solution solution = new Solution();
        String s = "egg";
        String t = "add";
        System.out.println(solution.isIsomorphic(s, t)); // 应该输出 true

        s = "foo";
        t = "bar";
        System.out.println(solution.isIsomorphic(s, t)); // 应该输出 false

        s = "paper";
        t = "title";
        System.out.println(solution.isIsomorphic(s, t)); // 应该输出 true
    }
}
