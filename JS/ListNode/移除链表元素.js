/**
 * @移除链表元素
 */
import { ListNode } from './ListNode.js'

/**
 * @原地修改 
 */
export function removeElements(head, val) {
    if (!head) {
        return head
    }
    let dummy = new ListNode(0, head)
    let p1 = dummy
    while (p1) {
        if (p1.next !== null && p1.next.val === val) {
            p1.next = p1.next.next
            continue
        }
        p1 = p1.next
    }
    return dummy.next
};