package 长度最小的子数组.src.main;
public class Solution {

    /**
     * 寻找长度最小的子数组，其和至少为给定目标值
     *
     * @param target 目标和
     * @param nums 整数数组
     * @return 长度最小的子数组的长度，如果不存在符合条件的子数组则返回0
     */
    public int minSubArrayLen(int target, int[] nums) {

        // 初始化滑动窗口的左右指针
        int left = 0;
        int right = 0;
        // 初始化当前滑动窗口内的总和
        int sum = 0;

        // 初始化最小子数组长度为最大整数值，表示找不到满足条件的子数组
        int min = Integer.MAX_VALUE;

        // 遍历数组，右指针向右移动
        while (right < nums.length) {
            // 将右指针指向的元素添加到当前总和
            sum += nums[right];

            // 当当前总和大于等于目标值时，尝试缩小窗口并更新最小长度
            while (sum >= target) {
                // 更新最小长度
                min = Math.min(min, right - left + 1);
                // 将左指针指向的元素从总和中减去，准备缩小窗口
                sum -= nums[left];
                // 左指针向右移动，缩小窗口
                left++;
            }

            // 右指针向右移动，扩大窗口
            right++;
        }

        // 如果最小长度仍为最大整数值，表示找不到满足条件的子数组，返回0；否则返回最小长度
        return min == Integer.MAX_VALUE ? 0 : min;
    }


        // 暴力解法
        // int min = Integer.MAX_VALUE;
        // for (int i = 0; i < nums.length; i++) {
        //     int sum = 0;
        //     for (int j = i; j < nums.length; j++) {
        //         sum += nums[j];
        //         if (sum >= target) {
        //             min = Math.min(min, j - i + 1);
        //             break;
        //         }
}