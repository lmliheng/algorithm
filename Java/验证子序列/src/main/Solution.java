package 验证子序列.src.main;


// 无序的


public class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        int j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        if (i < s.length()) {
            return false;
        }


        return true;

    }
}