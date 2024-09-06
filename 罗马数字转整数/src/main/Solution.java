package 罗马数字转整数.src.main;
//注意
//s =
//"MCMXCIV"
//错误转换

public class Solution {
    public int romanToInt(String s) {
        if (s == "IV") return 4;
        if (s == "IX") return 9;
        if (s == "XL") return 40;
        if (s == "XC") return 90;
        if (s == "CD") return 400;
        if (s == "CM") return 900;
        int result = 0;
        for (int i = 0; i < s.length(); i++) {
            switch (s.charAt(i)) {
                case 'I':
                    result += 1;
                    break;
                case 'V':
                    result += 5;
                    break;
                case 'X':
                    result += 10;
                    break;
                case 'L':
                    result += 50;
                    break;
                case 'C':
                    result += 100;
                    break;
                case 'D':
                    result += 500;
                    break;
                case 'M':
                    result += 1000;
                    break;

            }
        }
        return result;


    }
}