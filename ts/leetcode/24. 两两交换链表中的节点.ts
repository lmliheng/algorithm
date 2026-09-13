import { ListNode } from "../JS/DataStructure/ListNode.js"

/**
 * @24. 两两交换链表中的节点
 */

function swapPairs(head: ListNode<number> | null): ListNode<number> | null {
   
    if (!head || !head.next) {
        return head
    }
    let one = head
    let two = one.next
    let three = (two!).next
    two!.next = one
    one.next = swapPairs(three)
    return two

};