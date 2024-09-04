package 轮转数组.src.main;

public class Solution {
    public void rotate(int[] nums, int k) {
        int len = nums.length;
        k %= len;
        reverse(nums, 0, len - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, len - 1);
        return;
    }
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
    public static void main(String[] args) {
//        int[] nums = {1,2,3,4,5,6,7};
//        int k = 3;
//        Solution solution = new Solution();
//        solution.rotate(nums, k);
//        for (int i : nums) {
//            System.out.print(i + " ");
//        }
    }


}
