package 赎金信.src.main;

public class Solution {


    public boolean canConstruct(String ransomNote, String magazine) {
        // 创建一个数组来统计每个字符在magazine中出现的次数
        int[] charCount = new int[26];

        // 遍历magazine字符串，统计每个字符出现的次数
        for (char c : magazine.toCharArray()) {
            charCount[c - 'a']++;
        }

        // 遍历ransomNote字符串，减少对应字符的计数
        for (char c : ransomNote.toCharArray()) {
            // 如果字符计数为0，表示magazine中没有足够的字符来构造ransomNote
            if (--charCount[c - 'a'] < 0) {
                return false;
            }
        }

        // 如果所有字符的计数都足够，返回true
        return true;
    }
}