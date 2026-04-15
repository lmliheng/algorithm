package 找到字符串中所有字母异位词.src.main;

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        // 创建need数组来存储p中每个字符的出现次数
        int[] need = new int[26];
        for (char c : p.toCharArray()) {
            need[c - 'a']++;
        }

        // 创建window数组来存储当前窗口中每个字符的出现次数
        int[] window = new int[26];
        List<Integer> result = new ArrayList<>();
        int left = 0, right = 0;

        while (right < s.length()) {
            // 将进入窗口的字符在window数组中的计数加一
            char c1 = s.charAt(right);
            window[c1 - 'a']++;

            // 当窗口大小等于p的长度时，检查是否构成异位词
            if (right - left + 1 == p.length()) {
                if (check(need, window)) {
                    result.add(left);
                }

                // 移动左指针，将离开窗口的字符在window数组中的计数减一
                char c2 = s.charAt(left);
                window[c2 - 'a']--;
                left++;
            }

            right++;
        }

        return result;
    }

    // 检查两个数组是否相同
    private boolean check(int[] need, int[] window) {
        for (int i = 0; i < 26; i++) {
            if (need[i] != window[i]) {
                return false;
            }
        }
        return true;
    }
}