package com.algorithm.leetcode;

import java.util.HashMap;
import java.util.Map;

/**
 * @lc 3
 * @title 无重复字符的最长子串
 * @difficulty medium
 * @tags 滑动窗口,哈希表,字符串
 * @time O(n)
 * @space O(min(n, 字符集大小))
 * @note 滑动窗口配计数表，右指针字符计数超 1 就收缩左边界
 */
public class LengthOfLongestSubstring {

    public int lengthOfLongestSubstring(String s) {
        int res = 0;
        int n = s.length();
        Map<Character, Integer> map = new HashMap<>();
        int left = 0;
        for (int i = 0; i < n; i++) {

            if (map.containsKey(s.charAt(i))) {
                map.put(s.charAt(i), map.get(s.charAt(i)) + 1);
            } else {
                map.put(s.charAt(i), 1);
            }

            while (map.get(s.charAt(i)) > 1) {
                map.put(s.charAt(left), map.get(s.charAt(left)) - 1);
                left++;
            }
            res = Math.max(res, i - left + 1);
        }
        return res;
    }
}
