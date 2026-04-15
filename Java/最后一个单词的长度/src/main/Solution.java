package 最后一个单词的长度.src.main;

public class Solution {
    public int lengthOfLastWord(String s) {

        String[] words = s.split(" ");
        return words[words.length - 1].length();



    }
}
