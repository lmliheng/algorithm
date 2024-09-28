package 不同路径IIP63.src.test;

import 不同路径IIP63.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.uniquePathsWithObstacles(new int[][]{{0, 0, 0}, {0, 1, 0}, {0, 0, 0}}));
    }
}
