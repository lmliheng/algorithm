/**
 * ========================================
 * LeetCode 2. 两数相加 (Add Two Numbers) - 链表版
 * ========================================
 * 
 * 【评分】⭐ (1/5)
 * 
 * 【你的思路】
 * 定义了ListNode构造函数，创建了测试链表
 * 但没有实现加法逻辑
 * 
 * 【代码分析】
 * ✅ 优点：
 *    - 正确定义了链表节点结构
 *    - 理解了链表的基本概念
 * ❌ 缺点：
 *    - 没有实现核心算法
 *    - 标注"不会"说明对链表操作不熟悉
 * 
 * 【正确思路】
 * 模拟人工加法，逐位相加 + 进位：
 * 
 * ```javascript
 * var addTwoNumbers = function(l1, l2) {
 *     let dummy = new ListNode(0);  // 哨兵节点
 *     let curr = dummy;
 *     let carry = 0;
 *     
 *     while (l1 || l2 || carry) {
 *         let sum = carry;
 *         if (l1) {
 *             sum += l1.val;
 *             l1 = l1.next;
 *         }
 *         if (l2) {
 *             sum += l2.val;
 *             l2 = l2.next;
 *         }
 *         carry = Math.floor(sum / 10);
 *         curr.next = new ListNode(sum % 10);
 *         curr = curr.next;
 *     }
 *     return dummy.next;
 * };
 * ```
 * 
 * 【关键技巧】
 * 1. 使用哨兵节点(dummy)简化头节点处理
 * 2. while循环条件要包含carry，处理最后的进位
 * 3. 取模和整除分别得到当前位和进位
 * 
 * 【复杂度】
 * 时间：O(max(m, n))
 * 空间：O(max(m, n))
 * 
 * 【面试建议】
 * 链表题要熟练掌握：
 * - 哨兵节点技巧
 * - 双指针/快慢指针
 * - 递归与迭代转换
 * ========================================
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
console.log(l1);

// 现状
// 文档 2：把链表当成数组，转成数字再算（容易溢出）
// 文档 2_1：定义了 ListNode，但没实现加法逻辑
// 优化思路 ✅
// 模拟人工加法，逐位相加 + 进位
// 关键点
// 不用转成整数
// 用 carry记录进位
// while 同时遍历两个链表
// 复杂度
// 时间：O(max(m, n))
// 空间：O(max(m, n))
// 这是链表题的标准解法。
