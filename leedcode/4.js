/**
 * ========================================
 * LeetCode 4. 寻找两个正序数组的中位数
 * ========================================
 *   
 * 【你的思路】     
     使用concat合并两个数组
 * 2. 使用sort排序                   
 * 3. 根据数组长度奇偶性计算中位数
 * 
 * 【代码分析】 
 * ✅ 优点：
 *    - 思路清晰，逻辑正确
 *    - 奇偶判断处理得当
 *    - 能得到正确结果
 * ❌ 缺点：
 *    - 没有利用"已排序"的条件
 *    - concat + sort时间复杂度O((m+n)log(m+n))
 *    - 可以优化到O(log(min(m,n)))
 * 
 * 【优化思路】
 * 二分查找 + 分割线思想：
 * 1. 将两个数组想象成一个虚拟的有序数组
 * 2. 在较短数组上用二分找分割点
 * 3. 保证左右两边数量平衡
 * 4. 满足：左边最大值 ≤ 右边最小值
 * 
 * 【关键点】
 * - 始终在较短的数组上二分
 * - 分割线左边元素数量 = (m+n+1)/2
 * - 处理边界情况（分割线在边界）
 * 
 * 【复杂度对比】
 * 当前：时间O((m+n)log(m+n)) 空间O(m+n)
 * 优化：时间O(log(min(m,n)))  空间O(1)
 * 
 * 【面试建议】
 * 这是Hard题，暴力解法能得分，
 * 但面试官会追问最优解。
 * ========================================
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    nums3=nums1.concat(nums2);
    nums3.sort((a,b)=>a-b);
     console.log(nums3);
    return nums3.length%2? (nums3[(nums3.length-1)/2]):(nums3[nums3.length/2-1]+nums3[nums3.length/2])/2
};

nums1 = [1,3]
nums2 = [2]
console.log(findMedianSortedArrays(nums1, nums2));


// concat + sort（O((m+n) log(m+n))）
// 浪费了"已排序"的条件
// 优化思路 ✅
// 二分查找 + 分割线思想
// 核心思想
// 把两个数组想象成一个虚拟的有序数组
// 用二分在较短的数组上找分割点
// 保证左右两边数量平衡 & 左边最大值 ≤ 右边最小值
// 复杂度
// 时间：O(log(min(m, n)))
// 这是这道题的最优解
