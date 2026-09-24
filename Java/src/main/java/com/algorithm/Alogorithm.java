package com.algorithm;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Alogorithm {

    /**
     * @1.两数之和
     */
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }

    /**
     * 
     * @2.两数相加
     */

    /**
     * 
     * @3.无重复字符的最长子串
     */
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

    /**
     * @56. 合并区间
     */
    public int[][] merge(int[][] intervals) {
        
        if (intervals == null || intervals.length == 0) {
            return new int[0][]; // 返回空二维数组
        }

        List<int[]> res = new ArrayList<>();
        // 后续改成lamada
        Arrays.sort(intervals, new Comparator<int[]>() {
            @Override
            public int compare(int[] a, int[] b) {
                return a[0] - b[0];
            }
        });
        res.add(intervals[0]);
        // jdk17 ArrayList无getLast()
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] > res.get(res.size() - 1)[1]) {
                res.add(intervals[i]);
            } else {
                int[] newInterval = { res.get(res.size() - 1)[0],
                        Math.max(res.get(res.size() - 1)[1], intervals[i][1]) };
                res.set(res.size() - 1, newInterval);
            }

        }
        return res.toArray(new int[res.size()][]);
    }

}
