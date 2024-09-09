package H指数.src.test;

import H指数.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        int[] citations = {3, 0, 6, 1, 5};
        Solution solution = new Solution();
        int hIndex = solution.hIndex(citations);
        System.out.println("H-index: " + hIndex);
    }
}
