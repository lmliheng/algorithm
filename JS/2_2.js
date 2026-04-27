
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let l3 = new ListNode(0, null)
    let p1 = l1
    let p2 = l2
    let p3 = l3
    let carry = 0
    while (p1 || p2) {
        let v1 = p1.val ? p1.val : 0
        let v2 = p2.val ? p2.val : 0
        let v3 = v1 + v2 + carry
        carry = Math.floor(v3 / 10) // 进位
        p3.next = new ListNode(v3 % 10);
        if (p1) p1 = p1.next
        if (p2) p2 = p2.next
        p3 = p3.next

    }
    if (carry) {
        p3.next = new ListNode(carry)
    }
    return l3.next

};

l1 = new ListNode(2, new ListNode(4, new ListNode(3)))
l2 = new ListNode(5, new ListNode(6, new ListNode(4)))
const res = addTwoNumbers(l1, l2)
console.log(res)
