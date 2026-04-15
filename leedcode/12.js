/**
 * ========================================
 * LeetCode 12. 整数转罗马数字
 * ========================================
 *  
 * 【评分】⭐⭐⭐⭐⭐  ( 5/5)   
 *            
 * 【你的思路】           
 * 预定义映射表 + 位 权 分解：         
 * 1. 为千位、百位、十位、个位分别预定义罗马数字映射
 * 2. 通过数学运算提取各位数字
. 直接查表拼接结果
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 思路清晰，代码简洁
 *    - 预定义映射表，效率高
 *    - 正确处理了特殊规则（如IV、IX、XL等）
 *    - 一行代码完成转换，非常优雅
 * ❌ 缺点：
 *    - 可读性稍差，需要理解位权分解
 *    - 没有输入范围校验（题目限制1-3999）
 * 
 * 【优化思路】
 * 当前解法已经是最优解之一。
 * 另一种常见方法是贪心：
 * 1. 从大到小遍历罗马数字值
 * 2. 尽可能多地使用大值
 * 
 * 【参考实现（贪心法）】
 * ```javascript
 * var intToRoman = function(num) {
 *     const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
 *     const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
 *     let res = '';
 *     
 *     for (let i = 0; i < values.length; i++) {
 *         while (num >= values[i]) {
 *             res += symbols[i];
 *             num -= values[i];
 *         }
 *     }
 *     return res;
 * };
 * ```
 * 
 * 【关键点】
 * - 罗马数字的特殊规则：IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
 * - 你的解法直接在映射表中处理了这些特殊情况
 * 
 * 【复杂度】
 * 时间：O(1) - 最多处理4位数字
 * 空间：O(1)
 * 
 * 【面试建议】
 * 你的解法非常优秀！
 * 可以补充说明贪心法作为另一种思路。
 * ========================================
 */

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    let M_str=['','M','MM','MMM']
    let C_str=['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM']
    let X_str=['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC']
    let I_str=['','I','II','III','IV','V','VI','VII','VIII','IX']
    return M_str[Math.floor(num / 1000 | 0)] + C_str[Math.floor(num % 1000 / 100)] + X_str[Math.floor(num % 100 / 10)] + I_str[num % 10]

    
};
