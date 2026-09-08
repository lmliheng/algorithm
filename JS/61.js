class ListNode {
    val;
    next;
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))));
let clonehead = head;
let p = head?.next;
while (head?.next?.next) {
    head = head.next;
    p = p.next;
}
head.next = null;
p.next = clonehead;
let a = 1;
export {};
