package com.algorithm.leetcode;

import java.util.HashMap;
import java.util.Map;

/**
 * @lc 1
 * @title 两数之和
 * @difficulty easy
 * @tags 哈希表,数组
 * @time O(n)
 * @space O(n)
 * @note 一次遍历，哈希表存「补数 → 下标」，命中即返回
 */
public class TwoSum {

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
}
