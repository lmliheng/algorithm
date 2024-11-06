package 单词规律.src.test;

import 单词规律.src.main.Solution;

public class Test {
    public static void main(String[] args) {

        Solution solution = new Solution();
//ERROR test：
//        System.out.println(solution.wordPattern("abba", "dog dog dog dog"));
        System.out.println(solution.wordPattern("abba", "dog cat cat fish"));
        System.out.println(solution.wordPattern("abba", "dog cat cat dog"));
    }


}
