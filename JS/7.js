/**
 * ========================================
 * LeetCode 7. 整数反转
 * ========================================
 * 
 * 【评分】⭐⭐⭐⭐ (4/5)
 * 
 * 【你的思路】
 * 1. 判断正负号
 * 2. 统计末尾0的个数
 * 3. 去除末尾0后反转字符串
 * 4. 处理溢出情况
 * 5. 添加正负号
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 思路清晰，逻辑完整
 *    - 正确处理了正负号
 *    - 考虑了溢出问题
 *    - 能得到正确结果
 * ❌ 缺点：
 *    - 代码冗余，反转逻辑可以简化
 *    - 处理末尾0的逻辑不必要（反转后自然处理）
 *    - 溢出判断后没有return
 *    - 变量命名可以更语义化
 * 
 * 【优化思路】
 * 数学方法直接反转：
 * 1. 通过取模和整除逐位提取数字
 * 2. 每次将结果乘10加新位
 * 3. 边计算边检查溢出
 * 
 * 【参考实现】
 * ```javascript
 * var reverse = function(x) {
 *     let res = 0;
 *     while (x !== 0) {
 *         const digit = x % 10;
 *         x = Math.trunc(x / 10);
 *         res = res * 10 + digit;
 *         // 溢出检查
 *         if (res < -(2**31) || res > 2**31 - 1) {
 *             return 0;
 *         }
 *     }
 *     return res;
 * };
 * ```
 * 
 * 【关键点】
 * - 使用Math.trunc代替parseInt，更语义化
 * - 边计算边检查，避免溢出后判断
 * - 不需要单独处理末尾0
 * 
 * 【复杂度】
 * 时间：O(log|x|) - 数字位数
 * 空间：O(1)
 * 
 * 【面试建议】
 * 数学方法比字符串方法更高效，
 * 但字符串方法更直观易理解。
 * ========================================
 */

x = 123
let isPositive = x > 0 ? 1 : 0
let zero_num = 0;
let zero_str = ''
x = Math.abs(x)
x_str = x.toString()
for (i = (x_str.length - 1); i >= 0; i--) {
    if (x_str[i] == '0') {
        zero_num += 1;
    } else {
        break
    }
}
let x_str_nozero = ''
let x_str_nozero_reverse = ''
for (i = 0; i < (x_str.length - zero_num); i++) {
    x_str_nozero += x_str[i]
}
for (i = (x_str_nozero.length - 1); i >= 0; i--) {
    x_str_nozero_reverse += x_str_nozero[i]
}

x = Number(x_str_nozero_reverse)
if (x > Math.pow(2, 31) - 1) {
}

result = isPositive ? Number(x_str_nozero_reverse) : -Number(x_str_nozero_reverse)
console.log(result);
