package 罗马数字转整数.src.main;

public class Solution {
    public int romanToInt(String s) {
        // 步骤1：创建映射表
        int[] values = new int[26];
        values['I' - 'A'] = 1;
        values['V' - 'A'] = 5;
        values['X' - 'A'] = 10;
        values['L' - 'A'] = 50;
        values['C' - 'A'] = 100;
        values['D' - 'A'] = 500;
        values['M' - 'A'] = 1000;

        int result = 0;
        int prevValue = 0;

        // 步骤2：遍历输入的罗马数字字符串
        for (int i = s.length() - 1; i >= 0; i--) {
            char currentChar = s.charAt(i);
            int currentValue = values[currentChar - 'A'];

            // 步骤3和4：检查是否是特殊组合，并更新结果
            if (currentValue < prevValue) {
                result -= currentValue;
            } else {
                result += currentValue;
            }

            // 更新prevValue为当前字符的值
            prevValue = currentValue;
        }

        // 步骤7：返回结果
        return result;
    }

    public static void main(String[] args) {

    }
}


//package 罗马数字转整数.src.main;
////注意CM,XC等特殊符号
////s =
////"MCMXCIV"
////错误转换
//
//public class Solution {
//    public int romanToInt(String s) {
//
//        if (s == "IV") return 4;
//        if (s == "IX") return 9;
//        if (s == "XL") return 40;
//        if (s == "XC") return 90;
//        if (s == "CD") return 400;
//        if (s == "CM") return 900;
//
//// 扩展：检查罗马数字合理性
//
//        int result = 0;
//        for (int i = 0; i < s.length(); i++) {
//            switch (s.charAt(i)) {
//                case 'I':
//                    if (i < s.length() - 1 && s.charAt(i + 1) == 'V')
//                        result += 4;
//                    else if (i < s.length() - 1 && s.charAt(i + 1) == 'X')
//                        result += 9;
//                    else
//                    result += 1;
//                    break;
//                case 'V':
//                    if (i < s.length() - 1 && s.charAt(i - 1) == 'I')
//                        result += 0;
//                    else
//                    result += 5;
//                    break;
//                case 'X':
//                    if (i < s.length() - 1 && s.charAt(i + 1) == 'L')
//                        result += 40;
//                    else if (i < s.length() - 1 && s.charAt(i + 1) == 'C')
//                        result += 90;
//                    else if (i < s.length() - 1 && s.charAt(i - 1) == 'I')
//                        result += 0;
//                    else
//                    result += 10;
//                    break;
//                case 'L':
//                    if (i < s.length() - 1 && s.charAt(i - 1) == 'X')
//                        result += 0;
//                    result += 50;
//                    break;
//                case 'C':
//                    if (i < s.length() - 1 && s.charAt(i + 1) == 'D')
//                        result += 400;
//                    else if (i < s.length() - 1 && s.charAt(i + 1) == 'M')
//                        result += 900;
//                    else if (i < s.length() - 1 && s.charAt(i - 1) == 'X')
//                        result += 0;
//                    else
//                    result += 100;
//                    break;
//                case 'D':
//                    if (i < s.length() - 1 && s.charAt(i - 1) == 'C')
//                        result += 0;
//                    result += 500;
//                    break;
//                case 'M':
//                    if (i < s.length() - 1 && s.charAt(i - 1) == 'C')
//                        result += 0;
//                    result += 1000;
//                    break;
//
//            }
//        }
//        return result;
//
//
//    }
//}