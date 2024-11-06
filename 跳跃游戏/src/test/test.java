package 跳跃游戏.src.test;
import 跳跃游戏.src.main.Solution;
//import 跳跃游戏.src.main.Solution.*;

public class test {
    public static void main(String[] args) {
        int[] nums1 = {2,3,1,1,4};
        int[] nums2 = {2,2,1,0,4};
        int[] nums3 = {1,0,1,0};



        Solution solution =new Solution();

        System.out.println(solution.canJump(nums1)==true);
        System.out.println(solution.canJump(nums2)==false);
        System.out.println(solution.canJump(nums3)==false);


    }
}
//true
//true
//false


