package com.algorithm;

import java.util.HashMap;
import java.util.Map;

public class DataStructure {

    /**
     * @String和int
     */
    public void testInteger() {
        System.out.println(('a' + 1)); // int
        System.out.println((char) ('a' + 1)); // Character

    }

    /**
     * @数组
     */
    public void testArray() {
        // util.Array 还是int[]
        int[] arr1={1,2,3};

    }

    /**
     * @Map
     *      分析HashMap等Map的原理
     * 
     */
    public void testMap() {

        // 统一使用Map作为类
        Map<Character, Integer> map = new HashMap<>();
        // 快速写入键值的方法 Map.ofEntries()支持任意键值对，返回的是不可变Map
        // 写入键值对还是老实put
        char[] keys = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
        int[] values = { 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
                13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
        for (int i = 0; i < keys.length; i++) {
            map.put(keys[i], values[i]);
        }

    }

}
