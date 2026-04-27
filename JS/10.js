/**
 * ========================================
 * LeetCode 10. 正则表达式匹配
 * ========================================
 * 
 * 【评分】⭐⭐ (2/5)
 * 
 * 【你的思路】
 * 1. 检查模式串p中是否包含*或.
 * 2. 如果包含，用RegExp构造正则并测试
 * 3. 如果不包含，直接比较字符串
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 知道用正则表达式解决问题
 *    - 能处理简单情况
 * ❌ 缺点：
 *    - 使用内置RegExp属于"作弊"，不符合题目意图
 *     - 题 目要求实现正则匹配算法，而不是调用API
 *    - 没有理解动态规划 解法  
 *    - 面试中这种解法会被判无效
 * 
 * 【正确思路】
 * 动态规划：
 * 1. dp[i][j]表示s[0:i]和p[ 0:j]是否匹配
 * 2. 状态转移：
 *    - p[j]不是*：直接匹配当前字符
 *    - p[j]是*：匹配0次或多次
 * 
 * 【参考实现】
 * ```javascript
 * var isMatch = function(s, p) {
 *     const m = s.length, n = p.length;
 *     const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
 *     dp[0][0] = true;
 *     
 *     // 初始化：处理a*b*c*可以匹配空串
 *     for (let j = 2; j <= n; j += 2) {
 *         if (p[j-1] === '*') dp[0][j] = dp[0][j-2];
 *     }
 *     
 *     for (let i = 1; i <= m; i++) {
 *         for (let j = 1; j <= n; j++) {
 *             if (p[j-1] === '*') {
 *                 // 匹配0次 或 匹配1次以上
 *                 dp[i][j] = dp[i][j-2] || 
 *                    (dp[i-1][j] && (s[i-1] === p[j-2] || p[j-2] === '.'));
 *             } else {
 *                 dp[i][j] = dp[i-1][j-1] && 
 *                    (s[i-1] === p[j-1] || p[j-1] === '.');
 *             }
 *         }
 *     }
 *     return dp[m][n];
 * };
 * ```
 * 
 * 【关键点】
 * - *可以匹配0次或多次前一个字符
 * - .可以匹配任意单个字符
 * - 初始化处理a*b*c*匹配空串的情况
 * 
 * 【复杂度】
 * 时间：O(m*n)
 * 空间：O(m*n)
 * 
 * 【面试建议】
 * 这是Hard题，动态规划是标准解法。
 * 面试中不要用内置正则API。
 * ========================================
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {


    let isDot = false;
    for (let i = 0; i < p.length; i++) {
        if (p[i] == '*' || p[i] == '.') {
            isDot = true
        }
    }
    if (isDot) {
        let reg = new RegExp(p)
        return reg.test(s)
    }else{
        return s==p? true : false
    }


};
console.log(isMatch('aa','a*'))
