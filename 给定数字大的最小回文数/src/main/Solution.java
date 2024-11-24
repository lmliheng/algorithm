package 给定数字大的最小回文数.src.main;

import java.util.Arrays;
import java.util.Scanner;

public class Solution {
    public static String findNextPalindrome(String n) {
        char[] digits = n.toCharArray();
        int len = digits.length;

        // 如果所有数字都是9，则下一个回文数为10...01（长度+1）
        boolean allNines = true;
        for (char digit : digits) {
            if (digit != '9') {
                allNines = false;
                break;
            }
        }
        if (allNines) {
            char[] result = new char[len + 1];
            Arrays.fill(result, '0');
            result[0] = '1';
            result[result.length - 1] = '1';
            return new String(result);
        }

        // 处理非全9的情况
        int mid = len / 2;
        boolean leftSmaller = false; // 标记左侧是否需要增加

        // 从中间向左检查是否需要增加
        int i = mid - 1;
        int j = (len % 2 == 0) ? mid : mid + 1;
        while (i >= 0 && digits[i] == digits[j]) {
            i--;
            j++;
        }

        // 如果左边小于右边，则需要增加左边
        if (i < 0 || digits[i] < digits[j]) {
            leftSmaller = true;
        }

        // 增加左边的值
        if (leftSmaller) {
            while (i >= 0) {
                if (digits[i] < '9') {
                    digits[i]++;
                    digits[j] = digits[i]; // 同时更新右边对应的值
                    break;
                } else {
                    digits[i] = digits[j] = '0';
                    i--;
                    j++;
                }
            }
            if (i < 0) { // 如果所有左边的数字都变成了0，则在最前面加1
                char[] result = new char[len + 1];
                Arrays.fill(result, '0');
                result[0] = '1';
                System.arraycopy(digits, 0, result, 1, len);
                return new String(result);
            }
        } else {
            // 如果不需要增加左边，则直接复制左边到右边
            while (i >= 0) {
                digits[j] = digits[i];
                i--;
                j++;
            }
        }

        return new String(digits);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String n = scanner.nextLine();
            System.out.println(findNextPalindrome(n));
        }
        scanner.close();
    }
}

// error example : input 1001