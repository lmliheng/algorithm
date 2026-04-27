/**
 * ========================================
 * LeetCode 11. 盛最多水的容器
 * ========================================
 * 
 * 【评分】⭐⭐⭐ (3/5)
 * 
 * 【你的思路】
 * 双重循环遍历所有可能的容器组合：
 * 1. 外层循环遍历每个位置
 * 2. 内层循环向右遍历计算面积
 * 3. 记录最大面积
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 思路正确，能计算正确结果
 *    - 代码结构清晰
 *    - 正确处理了边界情况
 * ❌ 缺点：
 *    - 时间复杂度O(n²)，效率低
 *    - 注释掉的左循环是多余的
 *    - 可以优化到O(n)
 * 
 * 【优化思路】
 * 双指针法：
 * 1. 左右两个指针从两端开始
 * 2. 计算当前面积
 * 3. 移动较矮的指针（因为面积由短板决定）
 * 4. 直到两指针相遇
 * 
 * 【参考实现】
 * ```javascript
 * var maxArea = function(height) {
 *     let left = 0, right = height.length - 1;
 *     let maxArea = 0;
 *     
 *     while (left < right) {
 *         const area = Math.min(height[left], height[right]) * (right - left);
 *         maxArea = Math.max(maxArea, area);
 *         
 *         // 移动较矮的指针
 *         if (height[left] < height[right]) {
 *             left++;
 *         } else {
 *             right--;
 *         }
 *     }
 *     return maxArea;
 * };
 * ```
 * 
 * 【关键点】
 * - 面积 = min(左高度, 右高度) × 宽度
 * - 移动较高的指针不可能得到更大的面积
 * - 只有移动较矮的指针才可能找到更大的面积
 * 
 * 【复杂度对比】
 * 当前：时间O(n²) 空间O(1)
 * 优化：时间O(n)   空间O(1)
 * 
 * 【面试建议】
 * 双指针是这道题的标准解法，
 * 重点理解为什么移动较矮的指针。
 * ========================================
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let head = 0;
    let foot = height.length - 1;
    let maxArea = 0;
    while (head < foot) {
        const area = Math.min(height[head], height[foot]) * (foot - head);
        maxArea = Math.max(maxArea, area);
        if (height[head] < height[foot]) {
            head++;
        } else {
            foot--;
        }
    }
    return maxArea;
};
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
