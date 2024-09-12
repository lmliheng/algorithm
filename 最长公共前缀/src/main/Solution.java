package 最长公共前缀.src.main;

public class Solution {
    public String longestCommonPrefix(String[] strs) {

        StringBuilder sb = new StringBuilder();
        int index = 0;
        while (true) {
            char c = strs[0].charAt(index);
            for (String str : strs) {
                if (str.length() <= index || str.charAt(index) != c) {
                    return sb.toString();
                }
            }
            sb.append(c);
            index++;
        }

    }
}