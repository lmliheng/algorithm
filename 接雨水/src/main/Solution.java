package 接雨水.src.main;

public class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if(n==0) return 0;
        int maxHeight = 0;
        for (int i = 0; i < n; ++i) {
            if (height[i] > height[maxHeight]) {
                maxHeight = i;
            }
        }

        int totalArea = 0;
        int leftMax = 0;
        for (int i = 0; i < maxHeight; ++i) {
            if (height[i] > leftMax) {
                leftMax = height[i];
            }
            totalArea += leftMax - height[i];
        }

        int rightMax = 0;
        for (int i = n - 1; i > maxHeight; --i) {
            if (height[i] > rightMax) {
                rightMax = height[i];
            }   
            totalArea += rightMax - height[i];
        }

        return totalArea;

    }




}
