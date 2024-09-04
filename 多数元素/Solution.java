package 多数元素;

public class Solution {
    public int majorityElement(int[] nums) {
        // 验证输入是否为空
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Input array cannot be null or empty");
        }

        // 使用摩尔投票法找到多数元素
        int candidate = nums[0];
        int count = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
                count = 1;
            } else if (candidate == num) {
                count++;
            } else {
                count--;
            }
        }

        // 验证候选元素是否确实是多数元素
        count = 0;
        for (int num : nums) {
            if (num == candidate) {
                count++;
            }
        }

        if (count > nums.length / 2) {
            return candidate;
        } else {
            // 如果没有多数元素，这里可以根据需求抛出异常或返回默认值
            throw new IllegalStateException("No majority element found");
        }
    }
}


// public class Solution {
//     public int majorityElement(int[] nums) {
//         // 假设nums[]非空
//         // 建立一个无重复的新数组new_nums[]
//         int j =1;
//         for (int i=0 ; i<nums.length ; ++i ){

//             nums[i]


//         }

//     }
// }