package 回文数P9.src.main;

public class Solution {
    public boolean isPalindrome(int x) {

        if (x < 0) return false;
        String s = String.valueOf(x);
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

}