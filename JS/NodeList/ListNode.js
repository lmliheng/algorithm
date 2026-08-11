/**
 * @单向链表
 */
export class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))