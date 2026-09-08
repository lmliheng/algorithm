"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function removeNthFromEnd(head, n) {
    if (!head) {
        return null;
    }
    // 获取链表长度
    let list_length = 0;
    let p1 = head;
    let p2 = head;
    while (p1) {
        p1 = p1.next ? p1.next : null;
        list_length++;
    }
    if (list_length === n) {
        return head.next;
    }
    for (let i = 0; i < list_length - n - 1; i++) {
        if (!p2) {
            break;
        }
        p2 = p2.next ? p2.next : null;
    }
    console.log('p2', p2);
    if (p2 && p2.next) {
        console.log('删除节点', p2.next);
        p2.next = p2.next.next ? p2.next.next : null;
    }
    else {
        return head.next;
    }
    return head;
}
;
const head = new ListNode(1, new ListNode(2));
// removeNthFromEnd(head, 0)
console.log(removeNthFromEnd(head, 2));
