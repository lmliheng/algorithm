
import { ListNode } from '../JS/DataStructure/ListNode.js'
/**
 * @21. 合并两个有序链表
 */

function mergeTwoLists(list1: ListNode<number> | null, list2: ListNode<number> | null): ListNode<number> | null {
    let dummy = new ListNode(0)
    let p1 = list1
    let p2 = list2
    let p = dummy
    while (p1 && p2) {
        if (p1.val > p2.val) {
            p.next = p2
            p2 = p2.next
            p=p.next
        } else {
            p.next = p1
            p1 = p1.next
            p=p.next
        }
    }
    if (!p1) {
        p.next = p2
    }
    if (!p2) {
        p.next = p1
    }
    return dummy.next
};