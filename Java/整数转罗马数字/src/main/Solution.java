package 整数转罗马数字.src.main;
//import java.util.Arrays;

import java.util.Arrays;

public class Solution {
    public int hIndex(int[] citations) {
        // 对引用次数数组进行降序排序
        Arrays.sort(citations);
        int n = citations.length;
        for (int i = 0; i < n; ++i) {
            // 检查当前位置的引用次数是否大于等于 n - i
            if (citations[i] >= n - i) {
                return n - i;
            }
        }
        // 如果没有找到满足条件的，返回0
        return 0;
    }

//    public static void main(String[] args) {
//        Solution solution = new Solution();
//        int[] citations1 = {3, 0, 6, 1, 5};
//        System.out.println(solution.hIndex(citations1)); // 应该输出 3
//
//    }
}