/**
 * ========================================
 * LeetCode 5. 最长回文子串
 * ========================================
 * 
 * 【评分】⭐⭐⭐ (3/5)
 * 
 * 【你的思路】
 * 中心扩散法：
 * 1. 先处理特殊情况（全相同字符）
 * 2. 以每个字符为中心向两边扩散
 * 3. 计算最大回文长度
 * 4. 单独处理偶数长度情况
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 掌握了中心扩散的核心思想
 *    - 能处理奇数长度回文
 * ❌ 缺点：
 *    - 逻辑分支太多，代码混乱
 *    - 奇偶情况分开处理，代码重复
 *    - 变量命名不够清晰（max_j）
 *    - 只计算了长度，没有返回子串
 *    - 注释"放弃"说明思路中断
 * 
 * 【优化思路】
 * 1. 统一处理奇偶长度（推荐面试用）：
 *    - 在字符间插入特殊字符（如#）
 *    - 统一变成奇数长度处理
 * 
 * 2. Manacher算法（进阶）：
 *    - 利用已计算的回文信息
 *    - 避免重复计算
 *    - 时间复杂度O(n)
 * 
 * 【参考实现】
 * ```javascript
 * var longestPalindrome = function(s) {
 *     let res = '';
 *     for (let i = 0; i < s.length; i++) {
 *         // 奇数长度
 *         expand(i, i);
 *         // 偶数长度
 *         expand(i, i + 1);
 *     }
 *     function expand(left, right) {
 *         while (left >= 0 && right < s.length && s[left] === s[right]) {
 *             left--;
 *             right++;
 *         }
 *         if (right - left - 1 > res.length) {
 *             res = s.slice(left + 1, right);
 *         }
 *     }
 *     return res;
 * };
 * ```
 * 
 * 【复杂度】
 * 中心扩散：时间O(n²) 空间O(1)
 * Manacher：时间O(n)   空间O(n)
 * 
 * 【面试建议】
 * 中心扩散法是面试标准答案，
 * 重点是把奇偶情况统一处理。
 * ========================================
 */






// 现状
// 中心扩散法（已经不错）
// 但后面逻辑混乱、分支太多
// 优化思路 ✅
// Manacher 算法（进阶）
// 常用选择
// 面试：中心扩散（O(n²)，可接受）
// 追求最优：Manacher（O(n)）
// 优化点
// 统一奇偶长度处理
// 减少不必要的 break / 判断


// 中心扩散法

/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function (s) {
    let res = '';
    // 一个元素有两种扩散，奇数长度和偶数长度
    for(let i=0;i<s.length;i++){
        // 奇数长度
        expand(i, i);
        // 偶数长度
        expand(i, i + 1);
    }
    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        if (right - left - 1 > res.length) {
            res = s.slice(left + 1, right);
        }
    }

    return res;

};
console.log(longestPalindrome("babad"))