package com.algorithm;

import java.util.HashMap;
import java.util.Map;

public class DataStructure {

    /**
     * @String和int
     */
    public void testInteger() {

        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b); // true

        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d); // false

        Long e = 127L;
        Long f = 127L;
        System.out.println(e == f); // true

        Long g = 128L;
        Long h = 128L;
        System.out.println(g == h); // false

        // 转成基本类型再比较
        System.out.println(e.longValue() == f.longValue());
        System.out.println(c.intValue() == d.intValue()); // true

        // 或者用equal比较内容
        System.out.println(c.equals(g)); // false 看实现
        System.out.println(c.equals(d)); // true

        System.out.println(('a' + 1)); // int
        System.out.println((char) ('a' + 1)); // Character

    }

    /**
     * @数组
     */
    public void testArray() {
        // util.Array 还是int[]
        int[] arr1 = { 1, 2, 3 };

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
