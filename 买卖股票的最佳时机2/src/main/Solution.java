package 买卖股票的最佳时机2.src.main;

//1. max-min||判定前后顺序即可
//2. 从前至后
public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) {
            return 0;
        }


        int maxProfit = 0;
            for (int i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    maxProfit += prices[i + 1] - prices[i];
                }
            }

        return maxProfit;
    }
}