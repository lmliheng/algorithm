/**
 * ========================================
 * LeetCode 8. 字符串转换整数 (atoi)
 * ========================================
 * 
 * 【评分】⭐⭐⭐ (3/5)
 * 
 * 【你的思路】
 * 1. 统计并去除前导空格
 * 2. 判断正负号
 * 3. 去除前导0
 * 4. 提取连续数字
 * 5. 处理溢出
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 思路清晰，覆盖了主要情况
 *    - 正确处理了正负号
 *    - 考虑了溢出边界
 * ❌ 缺点：
 *    - 代码冗长，变量命名混乱
 *    - 多次字符串切片，效率低
 *    - isNumber判断逻辑有问题（用ASCII范围判断）
 *    - 注释掉的代码太多
 *    - 测试用例"  +  413"会得到错误结果
 * 
 * 【优化思路】
 * 状态机/正则表达式：
 * 1. 使用正则直接匹配：/^\s*([+-]?\d+)/
 * 2. 或使用状态机逐字符处理
 * 
 * 【参考实现】
 * ```javascript
 * var myAtoi = function(s) {
 *     const match = s.match(/^\s*([+-]?\d+)/);
 *     if (!match) return 0;
 *     
 *     let num = parseInt(match[0]);
 *     const INT_MIN = -(2**31);
 *     const INT_MAX = 2**31 - 1;
 *     
 *     if (num < INT_MIN) return INT_MIN;
 *     if (num > INT_MAX) return INT_MAX;
 *     return num;
 * };
 * ```
 * 
 * 【关键点】
 * - 正则表达式简化匹配逻辑
 * - parseInt会自动处理前导0和符号
 * - 边界值用常量定义，避免魔法数字
 * 
 * 【复杂度】
 * 时间：O(n)
 * 空间：O(1)
 * 
 * 【面试建议】
 * 这题考察边界条件处理，
 * 用正则可以大大简化代码。
 * ========================================
 */

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {

    let font_space = 0
    let isPositive = false;
    let isNegative = false;
    let isNumber = true;
    let foot_font_zero = 0
    let foot_font_space = 0
    let foot_number_space = 0


    for (let i = 0; i < s.length; i++) {
        if (s[i] == ' ') {
            font_space += 1;
        } else {
            break
        }
    }


    let s_nofontspace = ''
    for (let i = font_space; i < s.length; i++) {
        s_nofontspace += s[i]
    }



    if (s_nofontspace[0] == '+' || s_nofontspace[0] == '-') {
        isPositive = s_nofontspace[0] == '+' ? true : false;
        isNegative = s_nofontspace[0] == '-' ? true : false;
        s_nofontspace = s_nofontspace.slice(1);
    } else {
        isNumber = (s_nofontspace[0] >= '/' && s_nofontspace[0] <= ':') ? true : false;
    }

    for (let i = 0; i < s_nofontspace.length; i++) {
        if (s_nofontspace[i] == '0') {
            foot_font_zero += 1;
        } else {
            break
        }
    }


    s_nofontspace = s_nofontspace.slice(foot_font_zero);

    for (let i = 0; i < s_nofontspace.length; i++) {
        if (s_nofontspace[i] >= '/' && s_nofontspace[i] <= ':') {
            foot_number_space += 1;
        } else {
            break
        }
    }
    s_nofontspace = s_nofontspace.slice(0, foot_number_space);

    if (isNumber == false) {
        return 0
    }

    num_s = isPositive ? Number(s_nofontspace) : Number(s_nofontspace)
    num_s = isNegative ? -num_s : num_s
    num_s = Math.max(num_s, -2147483648)

    if (num_s > 2147483647) {
        num_s = 2147483647
    }
    return num_s


};

console.log(myAtoi("  +  413"));
