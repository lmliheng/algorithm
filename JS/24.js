/**
 * Definition for singly-linked list.
 */
class ListNode {
    val;
    next;
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function swapPairs(head) {
    if (!head || !head.next) {
        return head;
    }
    console.log('head:', head);
    let p = head.next;
    head.next = swapPairs(p.next);
    p.next = head;
    return p;
}
;
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(swapPairs(head));
export {};
