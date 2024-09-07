package 验证回文串.src.main;

public class Solution {
    public boolean isPalindrome(String s) {
        // 使用StringBuilder来构建清理后的字符串
        StringBuilder cleanedString = new StringBuilder();

        // 遍历原始字符串，只保留字母数字字符，并转换为小写
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                cleanedString.append(Character.toLowerCase(c));
            }
        }

        // 获取清理后的字符串
        String filteredStr = cleanedString.toString();

        // 双指针法检查是否为回文
        int left = 0;
        int right = filteredStr.length() - 1;

        while (left < right) {
            if (filteredStr.charAt(left) != filteredStr.charAt(right)) {
                return false; // 如果对应位置的字符不相等，则不是回文
            }
            left++;
            right--;
        }

        return true; // 所有对应位置的字符都相等，是回文
    }

    public static void main(String[] args) {
//        Solution solution = new Solution();
//        System.out.println(solution.isPalindrome("A man, a plan, a canal: Panama")); // 应该输出 true
//        System.out.println(solution.isPalindrome("race a car")); // 应该输出 false
//        System.out == null; // 应该输出 true
    }
}

//package 验证回文串.src.main;
//
//public class Solution {
//
//    public boolean isPalindrome(String s) {
//
//        int left = 0;
//        int right = s.length() - 1;
//
//        while (left < right) {
//
//            if (!Character.isLetterOrDigit(s.charAt(left))) {
//
//                left++;
//                System.out.println("left:" + left);
//
//            } else if (!Character.isLetterOrDigit(s.charAt(right))) {
//
//                right--;
//                System.out.println("right:" + right);
//
//            } else {
//
//                if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
//                    return false;
//                }
//
////                left++;
////                right--;
//                return true;
//
//            }
//        }
//        return true;
//
//    }
//}