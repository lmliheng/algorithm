package 单词规律.src.main;

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public boolean wordPattern(String pattern, String s) {
        // 将字符串s按空格分割成单词数组
        String[] words = s.split(" ");

        // 如果pattern的长度和单词数组的长度不一致，则无法匹配
        if (pattern.length() != words.length) {
            return false;
        }

        // 创建两个映射表，分别用于存储字母到单词和单词到字母的映射
        Map<Character, String> charToWord = new HashMap<>();
        Map<String, Character> wordToChar = new HashMap<>();

        // 遍历pattern中的每个字母
        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String word = words[i];

            // 检查当前字母和单词的映射关系是否一致
            if (!charToWord.containsKey(c) && !wordToChar.containsKey(word)) {
                // 如果都没有映射，则添加新的映射关系
                charToWord.put(c, word);
                wordToChar.put(word, c);
            } else if (!charToWord.get(c).equals(word) || wordToChar.get(word) != c) {
                // 如果映射关系不一致，则返回false
                return false;
            }
        }

        // 如果所有映射关系都一致，则返回true
        return true;
    }


}