/**
 * ========================================
 * LeetCode 6. Z 字形变换
 * ========================================
 * 
 * 【评分】⭐⭐ (2/5)
 * 
 * 【你的思路】
 * 1. 补0使字符串长度能被整除
 * 2. 计算分组数量
 * 3. 尝试按某种规律重新排列
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 尝试理解Z字形排列的规律
 * ❌ 缺点：
 *    - 思路完全错误，补0的方式不可行
 *    - 逻辑非常绕，难以维护
 *    - 没有实现核心的字符重排逻辑
 *    - 注释"放弃"说明思路中断
 * 
 * 【正确思路】
 * 按行索引直接构造字符串：
 * 1. 创建numRows个数组，每行一个
 * 2. 用方向变量控制字符填充方向
 * 3. 到达边界时改变方向
 * 4. 最后按行拼接结果
 * 
 * 【参考实现】
 * ```javascript
 * var convert = function(s, numRows) {
 *     if (numRows === 1) return s;
 *     
 *     const rows = new Array(numRows).fill('');
 *     let curRow = 0;
 *     let goingDown = false;
 *     
 *     for (let c of s) {
 *         rows[curRow] += c;
 *         // 到达顶部或底部时改变方向
 *         if (curRow === 0 || curRow === numRows - 1) {
 *             goingDown = !goingDown;
 *         }
 *         curRow += goingDown ? 1 : -1;
 *     }
 *     return rows.join('');
 * };
 * ```
 * 
 * 【关键点】
 * - 方向切换：到达第一行或最后一行时
 * - 边界处理：numRows=1时直接返回
 * - 不需要补0，直接按规则填充
 * 
 * 【复杂度】
 * 时间：O(n) - 遍历一次字符串
 * 空间：O(n) - 存储结果
 * 
 * 【面试建议】
 * 找规律题的关键是"模拟过程"，
 * 不要试图用数学公式硬算。
 * ========================================
 */

s = "PAYPALISHIRING",
numRows = 3
let new_s='';
let nullstr = '0'
for(let i=0; i<(numRows - s.length % (numRows + 1)); i++){
    nullstr += '0'
}
console.log(nullstr);
s = s + nullstr
let num_gourp=s.length/(numRows+1)
console.log(num_gourp);


// 放弃

// 六、Z 字形变换（文档 6）
// 现状
// 补 0、算 group、逻辑非常绕
// 基本不可维护
// 优化思路 ✅
// 按行索引直接构造字符串
// 核心思想
// 用一个数组 rows[]
// 用一个方向变量控制上下移动
// 遍历一次字符串即可
// 复杂度
// 时间：O(n)
// 空间：O(n)
