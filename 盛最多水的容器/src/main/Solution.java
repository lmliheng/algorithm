package 盛最多水的容器.src.main;

public class Solution {
    //    暴力解题
    public int maxArea(int[] height) {
        int max_area = 0;
        for (int i = 0; i < height.length; i++) {

            for (int j = i + 1; j < height.length; j++) {

                int minHeight = Math.min(height[i], height[j]);
                int width = j - i;
                int tempArea = minHeight * width;
                max_area = Math.max(max_area, tempArea);

            }


        }
        return max_area;


    }

}