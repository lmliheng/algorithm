/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    l1 = head
    while (l1 && l1.next) {
        if (l1.val == (l1.next ? l1.next.val : 0)) {
            l1.next = l1.next.next ? l1.next.next : null
        } else {
            l1 = l1.next // l1为null的时候 空指针异常
        }
    }
    return head
};

let l1 = new ListNode(1, new ListNode(1, new ListNode(2)))
let l2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))
const res = deleteDuplicates(l2)
console.log(res)
