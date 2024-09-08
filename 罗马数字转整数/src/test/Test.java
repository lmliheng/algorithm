package 罗马数字转整数.src.test;

import 罗马数字转整数.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.romanToInt("MCMXCIV")+"实际数值为1994");
        System.out.println(solution.romanToInt("LVIII")+"实际数值为58");

    }
}
