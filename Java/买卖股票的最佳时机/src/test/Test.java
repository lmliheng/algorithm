package 买卖股票的最佳时机.src.test;

import 买卖股票的最佳时机.src.main.Solution;

public class Test {
    public static void main(String[] args) {
        int[] prices = {7,1,5,3,6,4};
        Solution solution = new Solution();
        int maxProfit = solution.maxProfit(prices);
        System.out.println(maxProfit);
    }
}
