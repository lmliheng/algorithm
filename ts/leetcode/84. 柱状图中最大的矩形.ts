/**
 * @84. 柱状图中最大的矩形
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

let head: ListNode = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(5, null)))))))
// console.log(deleteDuplicates(head))

let p1: ListNode = head
// p1 = p1.next// 2追赶1
while (p1.next && p1.next.next) {
    if (p1.next.val === p1.next.next.val) {
        p1.next = p1.next.next
    } else {
        p1 = p1.next
    }
}

console.log(head)

export {};
