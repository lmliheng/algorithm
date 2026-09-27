package com.algorithm.leetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * @lc 56
 * @title 合并区间
 * @difficulty medium
 * @tags 排序,区间,数组
 * @time O(n log n)
 * @space O(n)
 * @note 先按左端点排序，再顺序合并与末尾区间重叠的部分
 */
public class MergeIntervals {

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
