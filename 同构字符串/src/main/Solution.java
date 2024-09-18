package 同构字符串.src.main;

public class Solution {
    public boolean isIsomorphic(String s, String t) {
        // 如果两个字符串长度不同，它们一定不是同构的
        if (s.length() != t.length()) {
            return false;
        }

        // 创建两个数组来存储字符的映射关系
        int[] mapS = new int[256]; // 假设字符是ASCII码
        int[] mapT = new int[256];

        // 遍历字符串s和t
        for (int i = 0; i < s.length(); i++) {
            char charS = s.charAt(i);
            char charT = t.charAt(i);

            // 如果当前字符还没有映射关系
            if (mapS[charS] == 0 && mapT[charT] == 0) {
                mapS[charS] = charT;
                mapT[charT] = charS;
            } else if (mapS[charS] != charT || mapT[charT] != charS) {
                // 如果当前字符已经有映射关系，但不是双向的，则不是同构的
                return false;
            }
        }

        // 如果所有字符都是同构的，则返回true
        return true;
    }


}